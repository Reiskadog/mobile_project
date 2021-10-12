import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    screen: {
      padding: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#8080ff',
      },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
    flexCenter: {
        flex:1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    textInput: {
        padding: 3,
        borderColor: 'black',
        borderWidth: 1,
        width: 200,
        marginVertical: 10,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    titleText2: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 30,
    },
    userStats: {
        //borderBottomWidth: 1,
        //borderLeftWidth: 1,
        padding:5,
        elevation: 10,
    },
    userStatsText1: {
        textAlign: "right",
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryTitles: {
        flex: 8,
        //alignItems: 'center',
    },
    categoryItem: {
        marginVertical: 10,
        padding: 5,
        alignItems: 'center',
        //justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#6060ff',
    },
    commentItem: {
        backgroundColor: '#ECDEFC',
        marginVertical: 5,
        padding: 5,
        borderRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#909090'
    },
    commentUsername: {
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 5,
        fontSize: 14,
    },
    commentMessage: {
        fontSize: 14,
    },
    newMessage: {
        marginTop: 20,
        backgroundColor: '#F4EFFA',
        borderRadius: 8,
        elevation: 5,
        padding: 5,
    },
    postMessage: {
        marginTop: 10,
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    postMessageButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#6060ff',
    },
    messageList: {
        maxHeight: 350,
    }
    /*inputStyle: {
        borderWidth: 2, 
        borderColor: 'red', 
        padding: 10,
        width:'80%',
        marginBottom:10,
    },
    buttonView:{
        width:'60%',
        flexDirection: 'row',
        justifyContent:"space-around",
    },
    button:{
        width:'40%',
        color:'red',
    },
    formStyle: {
        flex:1,
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:"center"
    },*/
});