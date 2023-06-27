import ChatSidebar from "./ChatSidebar";
import Navbar from "./Navbar";

export default function Layout({ className, children }) {
  return (
    <>
      <Navbar />
      <div className={"col-md-10 offset-md-1 mt-5 ".concat(className)}>
        {children}
      </div>
    </>

  );
}