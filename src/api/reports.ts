import { apiRequest } from './httpClient';
import type { AllReportRow, JamakharchaRow, ReportRequest, TerijPatrakRow } from './types';

export const getJamakharchaApi = (request: ReportRequest): Promise<JamakharchaRow[]> =>
  apiRequest<JamakharchaRow[]>('/reports/getReport/jamakharcha', {
    method: 'POST',
    body: JSON.stringify(request),
    auth: true,
  });

export const getTerijPatrakApi = (request: ReportRequest): Promise<TerijPatrakRow[]> =>
  apiRequest<TerijPatrakRow[]>('/reports/getReport/terijpatrak', {
    method: 'POST',
    body: JSON.stringify(request),
    auth: true,
  });

export const getAllReportApi = (request: ReportRequest): Promise<AllReportRow[]> =>
  apiRequest<AllReportRow[]>('/reports/getReport/all', {
    method: 'POST',
    body: JSON.stringify(request),
    auth: true,
  });
