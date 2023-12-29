
const EmptyState = ({ children }: { children }) => {
  return (
    <div className="flex z-50 h-screen w-screen items-center justify-center">
      {children}
    </div>
  );
};

export default EmptyState;
