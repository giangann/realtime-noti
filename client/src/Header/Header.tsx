export const Header = () => {
  return (
    <HeaderBox>
      <h3 style={{ color: "white" }}>Thông báo</h3>
    </HeaderBox>
  );
};

const HeaderBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        backgroundColor: "blue",
        height: 70,
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
};
