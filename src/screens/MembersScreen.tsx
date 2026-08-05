import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Member, members } from '../constants/mockData';
import colors from '../constants/colors';
import { ChevronRightIcon, PlusIcon, SearchIcon } from '../components/Icons';
import { Card, Chip } from '../components/UI';
import ScreenShell from '../components/ScreenShell';
import styles from './MembersScreen.module.css';

interface MemberRowProps {
  member: Member;
  onPress: () => void;
}

function MemberRow({ member, onPress }: MemberRowProps) {
  return (
    <button type="button" className={styles.rowPress} onClick={onPress}>
      <Card className={styles.rowCard}>
        <div className={styles.row}>
          <div className={styles.avatar}>
            <span className={styles.avatarText}>{member.id}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p className={styles.rowName}>{member.name}</p>
            <p className={styles.rowSub}>
              क्र. {member.number} · बचत ₹{member.monthlySaving}/मास
            </p>
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
  const [filter, setFilter] = useState<FilterMode>('all');
  const [query, setQuery] = useState('');

  const pendingCount = members.filter((m) => m.entryStatus === 'pending').length;

  const filtered = useMemo(() => {
    let list = members;
    if (filter === 'pending') list = list.filter((m) => m.entryStatus === 'pending');
    if (query.trim()) list = list.filter((m) => m.name.includes(query.trim()));
    return list;
  }, [filter, query]);

  return (
    <ScreenShell
      scroll={false}
      header={
        <>
          <div className={styles.headerTop}>
            <h1 className={styles.headerTitle}>सभासद</h1>
            <button type="button" className={styles.addBtn}>
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
          <Chip active={filter === 'completed'} onPress={() => setFilter('completed')}>
            <span style={{ color: filter === 'completed' ? '#fff' : '#000' }}>सर्व · २९ </span>
          </Chip>

          <Chip active={filter === 'all'} onPress={() => setFilter('all')}>
            <span style={{ color: filter === 'all' ? '#fff' : '#000' }}>नोंद पूर्ण· १८ </span>
          </Chip>

          <Chip active={filter === 'pending'} onPress={() => setFilter('pending')}>
            <span style={{ color: filter === 'pending' ? '#fff' : '#ff2d2d' }}>नोंद बाकी · {pendingCount}</span>
          </Chip>
        </div>
      }
    >
      <div className={styles.list}>
        {filtered.map((item) => (
          <MemberRow key={item.id} member={item} onPress={() => navigate(`/members/${item.id}`)} />
        ))}
      </div>
    </ScreenShell>
  );
}
