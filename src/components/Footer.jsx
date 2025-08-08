import './../styles/App.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} LifePro Healthcare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;