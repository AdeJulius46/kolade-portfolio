/* Re-mounts on every navigation: a lime curtain sweeps up off the new page as it arrives */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true" />
      <div className="page-in">{children}</div>
    </>
  );
}
