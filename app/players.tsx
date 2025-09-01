import React from 'react';
import { View, Text, TextInput, Pressable, FlatList, Image, StyleSheet } from 'react-native';
import { useStore } from '@/context/store';
import { Player } from '@/lib/types';

function uid(){ return Math.random().toString(36).slice(2); }

export default function Players() {
  const { state, dispatch } = useStore();
  const [nickname, setNickname] = React.useState('');
  const [name, setName] = React.useState('');

  function addPlayer(){
    if(!nickname.trim() || !name.trim()) return;
    const p: Player = { id: uid(), nickname, name, wins:0, losses:0, draws:0, goals:0 };
    dispatch({ type:'ADD_PLAYER', payload: p });
    setNickname(''); setName('');
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Jugadores</Text>
      <View style={s.row}>
        <TextInput placeholder="Nick" value={nickname} onChangeText={setNickname} style={s.input} />
        <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={s.input} />
        <Pressable onPress={addPlayer} style={s.btn}><Text>Agregar</Text></Pressable>
      </View>
      <FlatList
        data={state.players}
        keyExtractor={(p)=>p.id}
        renderItem={({item})=>(
          <View style={s.player}>
            <Text style={{fontWeight:'600'}}>{item.nickname}</Text>
            <Text>{item.name}</Text>
            <Text>Goles: {item.goals} | W:{item.wins} L:{item.losses} D:{item.draws}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No hay jugadores aún.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,padding:16, gap:12},
  title:{fontSize:22, fontWeight:'700'},
  row:{flexDirection:'row', gap:8},
  input:{borderWidth:1, borderRadius:8, padding:8, flex:1},
  btn:{borderWidth:1, borderRadius:8, paddingHorizontal:10, justifyContent:'center' },
  player:{borderWidth:1, borderRadius:10, padding:10, marginVertical:6}
});