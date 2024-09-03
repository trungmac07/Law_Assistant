
export const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#e0f7fa',
      overflow: 'hidden',
    },
    sidebar: {
      width: '300px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #ccc',
      padding: '10px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
    sidebarTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#004d40',
      display: 'flex',
      //justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    historyList: {
      marginTop: '10px',
      overflowY: 'auto',
    },
    historyItem: {
      padding: '17px',
      borderRadius: '8px',
      margin: '5px 0',
      cursor: 'pointer',
      backgroundColor: '#e0f2f1',
      color: '#004d40',
      textOverflow: 'ellipsis',
    },
    chatArea: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      textOverflow: 'ellipsis',
    },
    chatFrame: {
      width: '70%',
      maxWidth: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      
    },
    chatContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '10px',
      overflowY: 'auto',
    },
    message: {
      maxWidth: '70%',
      margin: '5px 0',
      padding: '5px 15px',
      borderRadius: '15px',
      color: '#004d40',
      fontSize: '17px',
      lineHeight: '21px',
      wordWrap: 'break-word',
      // Prevent XSS vulnerabilities
      whiteSpace: 'pre-wrap',
    },
    inputContainer: {
      flex: 0.2,
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderTop: '1px solid #ccc',
      backgroundColor: '#ffffff',
   
    },
    textarea : {
      width: '100%', // Ensure the textarea fills the container width
      height: '75%', // Set the height to 75% of its container
      border: 'none',
      outline: 'none',
      padding: '15px',
      fontSize: '19px',
      borderRadius: '8px',
      backgroundColor: '#e0f7fa',
      resize: 'none', 
      overflowWrap: 'break-word', // Ensures long words break onto the next line
      wordWrap: 'break-word', // Ensures the text wraps within the box
      whiteSpace: 'pre-wrap', // Preserves white spaces and wraps the text as needed
      fontFamily : 'arial',
    },
    input: {
      flex: 1,
      height: '75%',
      border: 'none',
      outline: 'none',
      padding: '10px',
      fontSize: '17px',
      borderRadius: '8px',
      backgroundColor: '#e0f7fa',
      textAlign: 'left',  
      verticalAlign: 'top', 
    },
    sendButton: {
      flex : 0.1,
      height : "30%",
      marginLeft: '10px',
      padding: '10px 20px',
      backgroundColor: '#00acc1',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: "17px"
    },
    '@media (max-width: 768px)': {
      sidebar: {
        width: '100%',
        borderRight: 'none',
        borderBottom: '1px solid #ccc',
      },
      chatArea: {
        padding: '10px',
      },
      chatFrame: {
        width: '100%',
        height: '80vh',
      },
    },
    '@media (max-width: 480px)': {
      sidebar: {
        display: 'none',
      },
      chatFrame: {
        width: '100%',
        height: '90vh',
      },
    },
  };
  