import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { monthlyReport, groupInfo, MonthlyReportRow } from '../constants/mockData';
import { COLUMNS, COLUMN_SET, ReportType, renderCell, ColumnKey } from './reportColumns';

const DESIGN_WIDTH = 1122;
const CAPTURE_SCALE = 2;

interface ReportPdfData {
  reportType: ReportType;
  month: string;
  year: string;
}

function buildPageHtml(
  data: ReportPdfData,
  chunkRows: MonthlyReportRow[],
  visibleCols: ColumnKey[],
  includeTfoot: boolean,
  startIndex: number
): string {
  const { reportType, month, year } = data;
  const totals = monthlyReport.totals;

  const headCells = visibleCols
    .map((col, i) => {
      const cls = i === 0 ? 'th th-name' : i === 1 ? 'th th-name' : 'th';
      return `<th class="${cls}">${COLUMNS.find((c) => c.key === col)!.label}</th>`;
    })
    .join('');

  const colWidths = visibleCols
    .map((_, i) => {
      const width = i === 0 ? 40 : i === 1 ? 150 : '';
      return width ? `<col style="width:${width}px">` : '<col>';
    })
    .join('');

  const bodyRows = chunkRows
    .map(
      (r, idx) =>
        `<tr>${visibleCols
          .map((col, i) => {
            const cls = i === 0 ? 'td td-name' : i === 1 ? 'td td-name' : 'td';
            return `<td class="${cls}">${col === 'sr' ? startIndex + idx + 1 : renderCell(r, col)}</td>`;
          })
          .join('')}</tr>`
    )
    .join('');

  const footCells = visibleCols
    .slice(2)
    .map((_, i, arr) => {
      const isLast = i === arr.length - 1;
      return `<td class="td ${isLast ? 'td-total td-highlight' : 'td-total'}">${
        (isLast ? totals.total : totals.saving).toLocaleString('en-IN')
      }</td>`;
    })
    .join('');

  const tfoot = includeTfoot
    ? `<tfoot><tr><td class="td td-total" colspan="2">एकुण</td>${footCells}</tr></tfoot>`
    : '';

  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return `
    <style>
      .pdf-root {
        width: ${DESIGN_WIDTH}px;
        background: #ffffff;
        padding: 30px 32px;
        box-sizing: border-box;
        color: #12241c;
        font-family: Inter, 'Noto Sans Devanagari', 'Noto Serif Devanagari', system-ui, sans-serif;
      }
      .pdf-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 14px;
        border-bottom: 3px solid #1b4332;
        margin-bottom: 14px;
      }
      .pdf-title {
        font-size: 30px;
        font-weight: 700;
        color: #1b4332;
        margin: 0;
      }
      .pdf-subtitle {
        font-size: 14px;
        color: #71695a;
        margin: 3px 0 0;
      }
      .pdf-meta {
        text-align: right;
        font-size: 13px;
        color: #71695a;
        line-height: 1.6;
      }
      .pdf-badge {
        text-align: center;
        background: #f4eac8;
        border: 1px solid #c9a227;
        border-radius: 10px;
        padding: 9px 12px;
        margin-bottom: 16px;
        font-size: 21px;
        font-weight: 600;
        color: #6b5410;
      }
      .pdf-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: separate;
        border-spacing: 0;
      }
      .pdf-table .th {
        background: #fff1c6;
        color: #71695a;
        font-size: 10.5px;
        font-weight: 700;
        padding: 7px 4px;
        text-align: center;
        border: 1px solid #e1d8bf;
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;
        line-height: 1.25;
      }
      .pdf-table .th-name {
        text-align: left;
      }
      .pdf-table .td {
        font-size: 11px;
        color: #1e1e1a;
        padding: 7px 4px;
        text-align: center;
        border: 1px solid #e1d8bf;
        white-space: nowrap;
      }
      .pdf-table .td-name {
        text-align: left;
        font-weight: 600;
      }
      .pdf-table tbody tr:nth-child(even) {
        background: #fbf7ec;
      }
      .pdf-table .td-total {
        background: #f6f1e2;
        font-weight: 800;
      }
      .pdf-table .td-highlight {
        color: #37609e;
      }
      .pdf-footer {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        font-size: 12.5px;
        color: #71695a;
      }
    </style>
    <div class="pdf-root">
      <div class="pdf-header">
        <div>
          <p class="pdf-title">${groupInfo.name}</p>
          <p class="pdf-subtitle">मासिक बचत गट अहवाल</p>
        </div>
        <div class="pdf-meta">
          <div>तयार दि.: ${today}</div>
          <div>सदस्य संख्या: ${monthlyReport.rows.length}</div>
        </div>
      </div>
      <div class="pdf-badge">${reportType} • ${month} • ${year}</div>
      <table class="pdf-table">
        <colgroup>${colWidths}</colgroup>
        <thead>
          <tr>${headCells}</tr>
        </thead>
        <tbody>
          ${bodyRows}
        </tbody>
        ${tfoot}
      </table>
      <div class="pdf-footer">
        <span>एकता युवा बचत गट</span>
        <span>मु. कुरुळी पो. आंधळगाव, ता. शिरूर जि. पुणे</span>
      </div>
    </div>`;
}

function createOffscreenWrapper(html: string): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.id = 'pdf-capture-wrapper';
  wrapper.innerHTML = html;
  wrapper.style.cssText = `position:absolute; top:0; left:-10000px; width:${DESIGN_WIDTH}px; background:#ffffff;`;
  document.body.appendChild(wrapper);
  return wrapper;
}

async function capturePage(pageEl: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(pageEl, {
    scale: CAPTURE_SCALE,
    useCORS: true,
    backgroundColor: '#ffffff',
    onclone: (doc) => {
      const cloneWrapper = doc.getElementById('pdf-capture-wrapper');
      if (cloneWrapper) {
        cloneWrapper.style.position = 'static';
        cloneWrapper.style.left = '0';
        cloneWrapper.style.top = '0';
      }
    },
  });
}

export async function downloadReportPdf(data: ReportPdfData) {
  const { reportType, month, year } = data;
  const visibleCols = COLUMN_SET[reportType];
  const allRows = monthlyReport.rows;

  const measureWrapper = createOffscreenWrapper(
    buildPageHtml(data, allRows, visibleCols, true, 0)
  );
  const measureRoot = measureWrapper.querySelector('.pdf-root') as HTMLElement;

  let chunks: MonthlyReportRow[][] = [];

  try {
    await document.fonts.ready;

    const rowEls = Array.from(
      measureRoot.querySelectorAll<HTMLElement>('.pdf-table tbody tr')
    );
    const rootTop = measureRoot.getBoundingClientRect().top;
    const firstRowTop = rowEls[0]?.getBoundingClientRect().top ?? 0;
    const headerBlockPx = Math.max(0, firstRowTop - rootTop);
    const rowHeights = rowEls.map((el) => el.offsetHeight);

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const usableW = pdf.internal.pageSize.getWidth() - margin * 2;
    const mmPerPx = usableW / (DESIGN_WIDTH * CAPTURE_SCALE);
    const pageCapPx = ((pageH - margin * 2) / mmPerPx) / CAPTURE_SCALE;

    let chunk: MonthlyReportRow[] = [];
    let used = headerBlockPx;
    allRows.forEach((row, i) => {
      const h = rowHeights[i] || 40;
      if (chunk.length > 0 && used + h > pageCapPx) {
        chunks.push(chunk);
        chunk = [];
        used = headerBlockPx;
      }
      chunk.push(row);
      used += h;
    });
    if (chunk.length > 0) chunks.push(chunk);
  } finally {
    measureWrapper.remove();
  }

  if (chunks.length === 0) return;

  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const usableW = pageW - margin * 2;

  for (let i = 0; i < chunks.length; i++) {
    const startIndex = chunks.slice(0, i).reduce((sum, c) => sum + c.length, 0);
    const wrapper = createOffscreenWrapper(
      buildPageHtml(data, chunks[i], visibleCols, i === chunks.length - 1, startIndex)
    );
    const pageEl = wrapper.querySelector('.pdf-root') as HTMLElement;
    try {
      const canvas = await capturePage(pageEl);
      if (i > 0) pdf.addPage();
      const hmm = (canvas.height * usableW) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, margin, usableW, hmm);
    } finally {
      wrapper.remove();
    }
  }

  pdf.save(`${reportType}-${month}-${year}.pdf`);
}
