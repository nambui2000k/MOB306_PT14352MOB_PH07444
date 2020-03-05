import * as React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    Keyboard,
    Image,
    KeyboardAvoidingView,
    ImageBackground
} from 'react-native'
import {
    TextField,
    FilledTextField,
    OutlinedTextField, 
  } from 'react-native-material-textfield';

import InfoStory from './Story/info-story';

export function Home({navigation}){
    const userProfile={
        infor:{
            userName:'A',
            age:''
        },
        listStorys:[
            {
                image: 'https://sachvui.com/cover/2018/tham-tu-lung-danh-conan.jpg',
                name :'Conan',
                category :'Hài hước, Trinh thám',
                total_chapters :'96 tập',
                is_full : true
            },
            {
                image: 'https://img.sachvui.com/images/2018/11/001.png',
                name :'Doremon',
                category :'Hài hước, Khoa học viễn tưởng',
                total_chapters :'120 tập',
                is_full :false
            },
            {
                image: 'https://sachvui.com/cover/2018/one-piece-dao-hai-tac.jpg',
                name :'OnePice',
                category :'Hành động, Phiêu lưu, Viễn tưởng, Hài',
                total_chapters :'378 tập',
                is_full :false
            },
            {
                image: 'https://sachvui.com/cover/2018/tham-tu-lung-danh-conan.jpg',
                name :'Conan 1',
                category :'Hài hước, Trinh thám',
                total_chapters :'96 tập',
                is_full : true
            },
            {
                image: 'https://img.sachvui.com/images/2018/11/001.png',
                name :'Doremon 1',
                category :'Hài hước, Khoa học viễn tưởng',
                total_chapters :'120 tập',
                is_full :false
            },
            {
                image: 'https://sachvui.com/cover/2018/one-piece-dao-hai-tac.jpg',
                name :'OnePice 1',
                category :'Hành động, Phiêu lưu, Viễn tưởng, Hài',
                total_chapters :'378 tập',
                is_full :false
            },
        ]
    }
    
    const urlLogo='https://upload.wikimedia.org/wikipedia/vi/8/80/FPT_New_Logo.png';

    const [userNameInput, setName] = useState("");
    const [ageInput, setAge] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [errorUserName, setErrorUserName] = useState('');
    const [errorAge, setErrorAge] = useState('');

    const [user, setUser] = useState(userProfile);

    const handleDeleteStory=(nameStory)=>{
        let newListStory= user.listStorys;
        
        
        newListStory=newListStory.filter((story)=>story.name!=nameStory)
        userProfile.listStorys=newListStory;
        console.log(user);
        setUser(userProfile)
    }
    const itentDetail=(item)=>{
        navigation.navigate('Detail',{data:item});
    }

   

    const checkValidate=()=>{
        Keyboard.dismiss();
        if(userNameInput.toString()==''){
            setErrorUserName("Vui lòng không để trống tên người dùng");
            return;
        } else{
            setErrorUserName("");
        }
        if(ageInput==''){
            setErrorAge("Vui lòng không để trống tuổi người dùng");
            return;
        }else{
            setErrorAge("");
        }


        if(isNaN(ageInput.toString())){
            setErrorAge("Sai định dạng tuổi");
            return;
        }
        else{
            setErrorAge("");
        }
        if(parseInt(ageInput.toString())<18){
            setErrorAge("Tuổi phải từ 18 tuổi trở lên");    
            return;
        }
        else{
            setErrorAge("");
        }
        setShowModal(false);
        
    }
    return(
        <ImageBackground source={require('./Image/bgr_blur.png')} style={{width: '100%', height: '100%'}}>
            <View>
                <Text style={styles.userName}>Xin chào, {userNameInput}</Text>
            
                <FlatList
                    style={styles.flatlist}
                    data={user.listStorys}
                    renderItem={({item})=>(
                        <InfoStory item={item} handleDelete={handleDeleteStory} itent={itentDetail} />
                    )}
                    keyExtractor={(item,index)=> index}
                />
            
                
                <Modal  visible={showModal} >
                <ImageBackground source={require('./Image/bgr_blur.png')} style={{width: '100%', height: '100%'}}>
                <KeyboardAvoidingView behavior="position">
                                <View style={styles.containerImageLogo}>
                                <Image style={styles.image} source={{ uri: urlLogo }} />
                            </View>
                            <View style={styles.modal}>
                                <OutlinedTextField
                                    errorColor="#FF0000"
                                    placeholderTextColor="#fff"
                                    baseColor="#fff"
                                    textColor='#fff'
                                    returnKeyType = { "next" }
                                    error= {errorUserName}
                                    onChangeText={(userNameInput)=>setName(userNameInput)}
                                    label='Họ và tên'
                                />
                                <OutlinedTextField
                                    
                                    errorColor="#FF0000"
                                    baseColor="#fff"
                                    textColor='#fff'
                                    placeholderTextColor="#fff"
                                    returnKeyType = { "next" }
                                    error={errorAge}
                                    keyboardType='phone-pad'
                                    onChangeText={(ageInput)=>setAge(ageInput)}
                                    label='Tuổi'
                                />
                            
                            <View style={styles.containerButton}>
                                <TouchableOpacity disabled={false}  
                                            onPress={
                                                ()=>checkValidate()
                                            }
                                            style={[styles.button]}>
                                        <Text style={[styles.text]}>Vào đọc truyện</Text>

                                    </TouchableOpacity>
                            </View>
                        
                            </View>
                            </KeyboardAvoidingView>
                            </ImageBackground>
                </Modal>
            
            </View>                     
        
        </ImageBackground>
    );

}

const styles = StyleSheet.create({
    button: {
        width:210,
        display: 'flex',
        height: 50,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2AC062',
        shadowColor: '#2AC062',
        shadowOpacity: 0.4,
        shadowOffset: { height: 10, width: 0 },
        shadowRadius: 20,
    },

    text: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
    },
    modal:{
        padding: 30,
        // marginTop:'25%'
    },
    containerButton:{
        margin: '5%',
        alignContent:'center',
        alignItems: 'center',
    },
    image:{
        
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
    },
    containerImageLogo:{
        marginTop:'15%',
        alignContent:'center',
        alignItems: 'center',
        width:'100%',
        height:'25%'
    },
    userName:{
        padding:'2%',
        marginLeft:'2%',
        // height:30,
        fontSize:20,
        color:'rgba(255,255,255,0.8)',
    },
    flatlist:{
        height:'90%'
    }

   
});