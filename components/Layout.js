import Navbar from "./Navbar";

export default function Layout({ children }) {

  return (
    <>
      <Navbar />
      <div className="col-md-6 offset-md-3 mt-5">
        {children}
      </div>
    </>

  );
}