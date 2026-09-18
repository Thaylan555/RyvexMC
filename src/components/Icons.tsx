import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const Base = ({ children, ...props }: P) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
export const SwordIcon = (p: P) => <Base {...p}><path d="m14.5 4.5 5-2-2 5-9 9-3-3 9-9Z"/><path d="m5.5 13.5-3 3 5 5 3-3"/><path d="m4 18 2 2"/></Base>
export const CopyIcon = (p: P) => <Base {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Base>
export const UsersIcon = (p: P) => <Base {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Base>
export const WifiIcon = (p: P) => <Base {...p}><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/></Base>
export const ShopIcon = (p: P) => <Base {...p}><path d="M3 9l1-5h16l1 5"/><path d="M5 13v7h14v-7"/><path d="M9 20v-6h6v6"/><path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/></Base>
export const ChevronIcon = (p: P) => <Base {...p}><path d="m9 18 6-6-6-6"/></Base>
export const ShieldIcon = (p: P) => <Base {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></Base>
export const MenuIcon = (p: P) => <Base {...p}><path d="M4 6h16M4 12h16M4 18h16"/></Base>
export const XIcon = (p: P) => <Base {...p}><path d="m6 6 12 12M18 6 6 18"/></Base>
export const UserIcon = (p: P) => <Base {...p}><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></Base>
export const LogoutIcon = (p: P) => <Base {...p}><path d="M10 17l5-5-5-5M15 12H3"/><path d="M21 19V5a2 2 0 0 0-2-2h-6"/></Base>
export const EditIcon = (p: P) => <Base {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></Base>
export const PlusIcon = (p: P) => <Base {...p}><path d="M12 5v14M5 12h14"/></Base>
export const TrashIcon = (p: P) => <Base {...p}><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/></Base>
export const UploadIcon = (p: P) => <Base {...p}><path d="M12 16V4m0 0-4 4m4-4 4 4"/><path d="M4 15v5h16v-5"/></Base>
export const ArrowUpRightIcon = (p: P) => <Base {...p}><path d="M7 17 17 7M7 7h10v10"/></Base>
