import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerColumn}>
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Our offerings</a>
            </li>
            <li>
              <a href="#">Newsroom</a>
            </li>
            <li>
              <a href="#">Investors</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Products</h3>
          <ul>
            <li>
              <a href="#">Ride</a>
            </li>
            <li>
              <a href="#">Drive</a>
            </li>
            <li>
              <a href="#">Deliver</a>
            </li>
            <li>
              <a href="#">Eat</a>
            </li>
            <li>
              <a href="#">RideSharing for Business</a>
            </li>
            <li>
              <a href="#">RideSharing Freight</a>
            </li>
            <li>
              <a href="#">Gift cards</a>
            </li>
            <li>
              <a href="#">RideSharing Health</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Global citizenship</h3>
          <ul>
            <li>
              <a href="#">Safety</a>
            </li>
            <li>
              <a href="#">Sustainability</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3>Travel</h3>
          <ul>
            <li>
              <a href="#">Reserve</a>
            </li>
            <li>
              <a href="#">Airports</a>
            </li>
            <li>
              <a href="#">Cities</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 RideSharing Technologies Inc.</p>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Accessibility</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
