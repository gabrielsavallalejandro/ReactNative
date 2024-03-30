import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button,FlatList,TouchableOpacity,Modal} from 'react-native';
import React, {useState} from 'react';

const App = () => {

  const [textItem, settextItem] = useState("") //Toma el valor de lo que escribimos en el textinput

  const [itemList, setItemList] = useState([]) // Crea una lista con los valores ingresados en el "Hook anterior".

  const [modalVisible, setModalVisble] = useState(false)

  const [itemSelected, setItemSelected] = useState({})

  const handleChangeText = (text) => settextItem(text)
 

  const addItem = () => {
    setItemList(currentValue => [
      ...currentValue,
      {id: Math.random().toString(), value: textItem}
    ])
    settextItem("")
  }

  const handleModal = (item) => {
    setItemSelected(item)
    setModalVisble(true)
  }

  const handleDelete = () => {
    const filter = itemList.filter(task => task !== itemSelected)
    setItemList(filter)
    setModalVisble(false)
  }

  const handleCancelModal = () => {
    setModalVisble(false)
    setItemSelected({})
  }

  return (
    <View style={styles.screen}>

      <View style={styles.container} >

        <TextInput style={styles.inputContainer}

        onChangeText={handleChangeText} //OnchangeText captura lo escrito en el textInput y actualiza el valor del SetTextItem
       
        value={textItem}
        />
        <Button title='ADD' onPress={addItem}/>
      </View>

      <FlatList
        data={itemList}
        keyExtractor={task => task.id.toString()}
        renderItem={({item})=> //El item es el valor que nos renderiza el renderItem
          <TouchableOpacity
                            style={styles.containerCard}
                            onPress={()=> handleModal (item)}
                            > 
            <Text style={styles.card}>{item.value}</Text>
          </TouchableOpacity>//Permite que se me sombree lo que apreto. Remplaza el buttom, ya que se le puede dar estilos.

        }> 
      </FlatList>

      <Modal visible={modalVisible} animationType='slide' transparent={true}> 

        <View style={styles.modalStyles}>

            <View style={styles.modalContainer}>

              <View>
                <Text style={styles.textContainer}>Estas seguro que queres borrar:</Text>
              </View>
              <View>
                <Text style={styles.textModal}>{itemSelected.value}</Text>
              </View>
              <View style={styles.btnContainer}>
                <Button title='Borrar' onPress={handleDelete}></Button>
                <Button title='Cancelar' onPress={handleCancelModal}></Button>
              </View>

            </View>

        </View>

      </Modal>

    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignContent:"center",
    paddingTop:10,
    margin:50
  },

  inputContainer:{
    alignItems:"center",
    borderBlockEndColor:"black",
    borderBottomWidth:1,
    fontSize:10,
    width:"70%",
  },
  containerCard:{
    display:"flex",
    flexDirection:"column",
    borderWidth:1,
    margin:10,
    alignItems:"center",
  },
  card:{
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"grey",
    width: "90%",
    paddingVertical: 15,
    marginVertical: 10,
  },
  modalStyles:{
    backgroundColor:"grey",
    flex:1,
    alignItems: "center",
    justifyContent: "center"

  },
  modalContainer:{
    backgroundColor: "white",
    width:"80%",
    alignItems:"center",
    gap: 20,
    paddingVertical:20,
    borderRadius: 7,

  },
  textContainer:{
    
  },
  btnContainer:{
    flexDirection: "row",
    gap:20,
  },
  textModal:{
    fontWeight:"bold"
  },
  
});
