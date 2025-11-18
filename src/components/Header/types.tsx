import type { ChangeEvent } from 'react';

export type HeaderProps = {
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
