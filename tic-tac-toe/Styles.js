export default const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -536
    },
  
    body: {
      width: 312,
      maxHeight: 400,
      backgroundColor: '#FFFFFF'
    },
  
    playerInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingVertical: 20,
      marginTop: 28
    },
  
    playerText: {
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: 1.2,
      marginBottom: -8
    },
  
    boardContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
  
    cell: {
      width: 100,
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#999999',
      backgroundColor: 'white'
    },
  
    icon: {
      width: 70,
      height: 70
    },
  
    replayButton: {
      marginLeft: 134,
      marginTop: 6,
      marginBottom: 6
    },
  
    replayIcon: {
      width: 40,
      height: 40
    },
  
    historyContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
  
    button: {
      padding: 10,
      marginBottom: 2,
      backgroundColor: 'grey',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonTitle: {
      color: 'white',
      MozUserSelect: "none",
      WebkitUserSelect: "none",
      msUserSelect: "none"
    }
  });