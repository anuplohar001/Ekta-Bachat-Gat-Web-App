import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../constants/colors';
import { ChevronRightIcon, PlusIcon, SearchIcon } from '../components/Icons';
import { Card, Chip } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import { useMembers } from '../hooks/useMembers';
import { createMemberApi } from '../api/members';
import { toErrorMessage } from '../utils/errorMessages';
import type { MemberListItem } from '../api/types';
import styles from './MembersScreen.module.css';
import MemberAddModal, { MemberFormValues } from './MemberAddModal';
import { Users } from 'react-feather';
import Loader from '../components/Loader';

interface MemberRowProps {
  member: MemberListItem;
  onPress: () => void;
}

function MemberRow({ member, onPress }: MemberRowProps) {
  const completed = member.entryStatus === true;
  return (
    <button type="button" className={styles.rowPress} onClick={onPress}>
      <Card className={styles.rowCard}>
        <div className={styles.row}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>{member.name.trim().charAt(0)}</span>
          </div>
          <div className="d-flex justify-content-between" style={{ flex: 1 }}>
            <span className={styles.rowName}>{member.name}</span>
            <span
              className={` p-1 px-2 rounded-3 ${completed
                  ? "custom-bg-success"
                  : "custom-bg-danger"
                }`}
              style={{ fontSize: 14 }}
            >
              {completed ? "नोंद पूर्ण" : "नोंद बाकी"}
            </span>
          </div>
          <ChevronRightIcon />
        </div>
      </Card>
    </button>
  );
}

type FilterMode = 'all' | 'pending' | 'completed';

export default function MembersScreen() {
  const navigate = useNavigate();
  const { data: members, error, loading, refetch } = useMembers();
  const [filter, setFilter] = useState<FilterMode>('all');
  const [query, setQuery] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const pendingCount = members?.filter((m) => !m.entryStatus).length ?? 0;
  const completedCount = members?.filter((m) => m.entryStatus).length ?? 0;

  const filtered = useMemo(() => {
    if (!members) return [];
    let list = members;
    if (filter === 'pending') list = list.filter((m) => !m.entryStatus);
    if (filter === 'completed') list = list.filter((m) => m.entryStatus);
    if (query.trim()) list = list.filter((m) => m.name.includes(query.trim()));
    return list;
  }, [members, filter, query]);

  const handleAddMember = async (values: MemberFormValues) => {
    setSaveError(null);
    setSaving(true);
    try {
      await createMemberApi({
        name: values.name.trim(),
        number: parseInt(values.number, 10),
        phone: values.phone.trim(),
        monthlySaving: parseFloat(values.monthlySaving) || 0,
        password: values.password,
      });
      setAddOpen(false);
      await refetch();
    } catch (err) {
      setSaveError(toErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScreenShell
      scroll={false}
      header={
        <>
          <div className={styles.headerTop}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 20 }}>
              <Users color={colors.cream2} />
              <h1 className={styles.headerTitle}>सभासद यादी</h1>
            </div>
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => {
                setSaveError(null);
                setAddOpen(true);
              }}
            >
              <PlusIcon />
            </button>
          </div>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              type="text"
              placeholder="सभासद शोधा…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </>
      }
      stickyBar={
        <div className={styles.chipRow}>
          <Chip active={filter === 'all'} onPress={() => setFilter('all')}>
            <span style={{ color: filter === 'all' ? '#fff' : '#000' }}>सर्व · {members?.length ?? 0}</span>
          </Chip>

          <Chip active={filter === 'completed'} onPress={() => setFilter('completed')}>
            <span style={{ color: filter === 'completed' ? '#fff' : '#000' }}>नोंद पूर्ण · {completedCount}</span>
          </Chip>

          <Chip active={filter === 'pending'} onPress={() => setFilter('pending')}>
            <span style={{ color: filter === 'pending' ? '#fff' : '#ff2d2d' }}>नोंद बाकी · {pendingCount}</span>
          </Chip>
        </div>
      }
    >
      
      {error && (
        <p style={{ color: colors.redInk, fontSize: 13, textAlign: 'center', padding: 12 }}>
          {error}
        </p>
      )}
      <div className={styles.list}>
        {loading && (
          <Loader blur={false}/>
        )}
        {filtered.map((item) => (
          <MemberRow key={item.id} member={item} onPress={() => navigate(`/members/${item.id}`)} />
        ))}
      </div>

      <MemberAddModal
        visible={addOpen}
        saving={saving}
        error={saveError}
        onCancel={() => setAddOpen(false)}
        onSave={handleAddMember}
      />
    </ScreenShell>
  );
}
