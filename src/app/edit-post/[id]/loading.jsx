const Loading = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-dark">
        <div className="loader w-16 h-16 border-t-4 border-themeColor border-solid rounded-full animate-spin"></div>
      </div>
    );
  };
  
  export default Loading;