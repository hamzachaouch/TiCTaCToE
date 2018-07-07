import React from 'react';
import { StyleSheet, Button,Text, View,TouchableOpacity ,Alert,StatusBar} from 'react-native';
import {MaterialCommunityIcons as Icon } from 'react-native-vector-icons'
export default class App extends React.Component {

    constructor (props){
        super(props)
        this.state ={
            gameState :[
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            currentPlayer : 1,
        }

    }
    componentDidMount(){
        this.initializeGame()
    }
    initializeGame = () =>{
       this.setState({ gameState:
           [
             [0,0,0],
             [0,0,0],
             [0,0,0]
           ],
           currentPlayer:1,
       })

    }

    newGamePress = ( ) => {
        this.initializeGame()
    }

    renderIcon = (row,col)=>{
        var value = this.state.gameState[row][col]
        switch (value){
            case  1: return <Icon name="close" style={styles.tileX}/>
            case -1: return <Icon name="circle-outline" style={styles.tileO}/>
            case  0: return <View/>


        }
    }
    // oon va retourner 1 si player 1 gage et -1 si player 2 gagne ou 0 pour aucun
    getWinner= ()=>{
        const  max=3
        tab = this.state.gameState
        var sum ;
        // verifier les lignes
        for (var i =0;i< max;i++){
            sum=tab[i][0]+tab[i][1]+tab[i][2]
            if (sum == 3){return 1}
            else if (sum == -3) {return -1}
        }
        // verifier les colonnes
        for (var i =0;i< max;i++){
            sum=tab[0][i]+tab[1][i]+tab[2][i]
            if (sum == 3){return 1}
            else if (sum == -3) {return -1}

        }
        //véréfier les diag
        sum = tab[0][0]+tab[1][1]+tab[2][2]
        if (sum == 3){return 1}
        else if (sum == -3) {return -1}

        sum = tab[2][0]+tab[1][1]+tab[0][2]
        if (sum == 3){return 1}
        else if (sum == -3) {return -1}


        //pas de gagnants
        return 0
    }
    onTilePress =(row,col)=>{
        // ne pas permettre de changer un tile
        var value= this.state.gameState[row][col]
        if (value !== 0  ){return ;}

        var currentPlayer = this.state.currentPlayer
        // mettre le tile
        var array = this.state.gameState.slice()
        array[row][col] = currentPlayer
        this.setState({gameState:array})
        //changer d'utulisateur
        var nextPlayer = (currentPlayer == 1) ? -1 : 1
        this.setState({currentPlayer: nextPlayer})

        var winner = this.getWinner()
        if (winner== 1){Alert.alert("Player 1 wins");this.initializeGame()}
        else if (winner== -1){Alert.alert("Player 2 wins");this.initializeGame()}

    }



    render() {
    return (

        <View style={styles.container}>
            <View style={{marginBottom:40, alignItems:"center" ,justifyContent:"center"}}>
                <Text style={{color:"#3d87ff",fontSize:40,fontWeight:"bold"}}>TAC TIC TOE</Text>
            </View>
          <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile,{borderLeftWidth:0,borderTopWidth:0,alignItems:'center',justifyContent:'center'}]}>
                  {this.renderIcon(0,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth:0,alignItems:'center',justifyContent:'center'}]}>
                  {this.renderIcon(0,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile,{borderTopWidth:0,borderRightWidth:0,alignItems:'center',justifyContent:'center'}]}>
                  {this.renderIcon(0,2)}
              </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>this.onTilePress(1,0)} style={[styles.tile,{ borderLeftWidth:0,alignItems:'center',justifyContent:'center'}]}>
                  {this.renderIcon(1,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.onTilePress(1,1)} style={[styles.tile,{alignItems:'center',justifyContent:'center'}]}>
                  {this.renderIcon(1,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.onTilePress(1,2)} style={[styles.tile,{borderRightWidth:0,alignItems:'center',justifyContent:'center'}]}>
                  {this.renderIcon(1,2)}
              </TouchableOpacity>
          </View>

          <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={()=>this.onTilePress(2,0)} style={[styles.tile,{borderLeftWidth:0,alignItems:'center',justifyContent:'center' ,borderBottomWidth:0}]}>
                  {this.renderIcon(2,0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.onTilePress(2,1)} style={[styles.tile,{borderBottomWidth:0,alignItems:'center',justifyContent:'center'}]}>
                  {this.renderIcon(2,1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.onTilePress(2,2)} style={[styles.tile,{borderBottomWidth:0,alignItems:'center',justifyContent:'center',borderRightWidth:0}]}>
                  {this.renderIcon(2,2)}
              </TouchableOpacity>
          </View>
            <View style={{paddingTop:50}}/>
            <Button style={{color:"#3d87ff"}} title="New Game" onPress={this.newGamePress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
      borderWidth:4,
      width: 120,
      height:120,
  },
    tileX:{
      color: "red",
      fontSize: 80 ,
     },
    tileO :{
        color: "green",
        fontSize: 80 ,

    },


});
