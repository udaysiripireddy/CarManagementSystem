import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.copyRight}>© {new Date().getFullYear()} Uday Kumar Siripireddy</p>
        <div style={styles.links}>
          <a href="https://www.linkedin.com/in/uday-kumar-siripireddy/" target="_blank" rel="noopener noreferrer" style={styles.link}>
            LinkedIn
          </a>
          <a href="https://github.com/udaysiripireddy" target="_blank" rel="noopener noreferrer" style={styles.link}>
            GitHub 
          </a>
        </div>
      </div>
    </footer>
  );
};

// Styles for the footer
const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'center',  // Centers horizontally
    alignItems: 'center',      // Centers vertically
    flexDirection: 'column',   // Column direction for stacking items
    height: '120px',           // Footer height
    backgroundColor: '#333',   // Dark background color
    color: '#fff',             // White text
    padding: '10px',
    textAlign: 'center',       // Centers text inside footer
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',      // Centers the content in the column
  },
  copyRight: {
    margin: 0,
    fontSize: '26px',
  },
  links: {
    marginTop: '8px',          // Space between copyright and links
  },
  link: {
    marginTop: '10px',         // Increased space between the links
    color: '#00aaff',          // Link color (light blue)
    textDecoration: 'none',    // Remove underline from link
    fontSize: '20px',
    padding :'20px'
  },
};

export default Footer;
