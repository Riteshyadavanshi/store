const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div
        className={
          "flex   flex-col  h-screen  mt-12 lg:mt-5  items-center  bg-background    "
        }
      >
        {children}
      </div>
    </>
  );
};

export default LoginLayout;
