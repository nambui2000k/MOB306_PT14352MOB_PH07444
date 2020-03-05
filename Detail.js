import * as React from 'react';
import {View, Text,Image,StyleSheet,ScrollView,ImageBackground} from 'react-native';

export function Detail ({route, navigation}){
    const {data} = route.params;

    const category=[];
        if(data.is_full){
            category.push(<Text style={styles.category_full }>{` ${data.is_full ? 'Đầy':"Chưa đầy"}`}</Text>)    
        } else{
            category.push(<Text style={styles.category_not_full }>{` ${data.is_full ? 'Đầy':"Chưa đầy"}`}</Text>)        
        }
       
    

    return(
        <ImageBackground source={require('./Image/bgr_blur.png')} style={{width: '100%', height: '100%'}}>
            <ScrollView style={styles.container}>
                <View  >
                    <View >
                        <Image style={styles.image}  source={{ uri:data.image }} />
                    </View>
                    <View >
                        <View style={styles.container_content_title}>
                            <Text style={styles.title_content_name_story} >{`Tên truyện:`}</Text>
                            <Text style={styles.name_story}>{` ${data.name}`}</Text>
                        </View>
                        <View style={styles.container_content_category}>
                            <Text style={styles.title_content_category}>{`Thể loại:`}</Text>
                            <Text style={styles.category}>{` ${data.category}`}</Text>
                        </View>
                        <View style={styles.container_content_category}>
                            <Text style={styles.title_content_category}>{`Số tập:`}</Text>
                            <Text style={styles.category}>{` ${data.total_chapters}`}</Text>
                        </View>
                        <View style={styles.container_content_category}>
                            <Text style={styles.title_content_category}>{`Trạng thái:`}</Text>
                        {category}
                        </View>

                    </View>
                
            
                </View>
            
            </ScrollView>
        </ImageBackground>
    );

}


const styles = StyleSheet.create({

    container:{
      
        width:'100%',
        height:'100%'
    },
    image:{  
        marginTop:'2%', 
        flex: 1,
        aspectRatio: 1.5, 
        resizeMode: 'contain',
        
        
       
    },
    container_image:{
        width:'10%',
        

    },
    container_content:{
        marginLeft:'20%',
        flexDirection:'row',
        margin:'2%'
    },
    container_button:{
      
        width:'20%',
        flexDirection:'row',
        alignContent:'center',
        alignItems: 'center',
    },
    detail_content:{
        width:'95%',
        height:20
    },
    image_button:{
        padding:'25%',
        width:30,
        height:30
    },
    title_content: {
        color:'#808080'
    },
    container_content_title:{
        marginTop:'10%',
        flexDirection:'row',
        marginLeft:'20%',
        margin:'2%',
       
    },
    title_content_name_story:{
        color:'rgba(255,255,255,0.5)',
        fontSize:20
    },
    name_story:{
        fontSize:20,
        color:'#fff'
    },
    container_content_category:{
        flexDirection:'row',
        marginLeft:'20%',
        marginRight:'20%',
        margin:'2%',
        
    },
    title_content_category:{
        color:'rgba(255,255,255,0.5)',
        fontSize:15
    },
    category:{
        fontSize:15,
        color:'#fff'
    },
    category_full:{
        color:'#00FF00'
    },
    category_not_full:{
        color:'#fff'
    }




   
});