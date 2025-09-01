import React from 'react';
import { View, Text, Pressable, TextInput, FlatList, StyleSheet } from 'react-native';
import { useStore } from '@/context/store';
import { VoteCategory } from '@/lib/types';

function uid(){ return Math.random().toString(36).slice(2); }

export default function Admin(){
  const { state, dispatch } = useStore();
  const [category, setCategory] = React.useState('Mejor defensa');
  const [selectedMatchId, setSelectedMatchId] = React.useState(state.matches[0]?.id);

  function addCategory(){
    if(!selectedMatchId) return;
    const c: VoteCategory = { id: uid(), title: category, isOpen: true };
    dispatch({ type:'ADD_CATEGORY', payload: c });
    setCategory('');
  }

  function recordGoal(playerId: string){
    if(!selectedMatchId) return;
    const m = state.matches.find(m=>m.id===selectedMatchId);
    if(!m) return;
    const updated = { ...m, goals:[...m.goals, { playerId, minute: undefined }] };
    dispatch({ type:'UPDATE_MATCH', payload: updated });
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Panel Admin</Text>
      <Text style={{fontWeight:'600'}}>Partido activo</Text>
      <FlatList
        data={state.matches}
        horizontal
        keyExtractor={(m)=>m.id}
        renderItem={({item})=>(
          <Pressable onPress={()=>setSelectedMatchId(item.id)} style={[s.pill, selectedMatchId===item.id && s.pillOn]}>
            <Text>{new Date(item.dateISO).toLocaleDateString()}</Text>
          </Pressable>
        )}
      />
      <Text style={s.h2}>Registrar goles</Text>
      <FlatList
        data={state.players}
        keyExtractor={(p)=>p.id}
        renderItem={({item})=>(
          <View style={s.row}>
            <Text style={{flex:1}}>{item.nickname}</Text>
            <Pressable onPress={()=>recordGoal(item.id)} style={s.btn}><Text>+ Gol</Text></Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No hay jugadores.</Text>}
      />
      <Text style={s.h2}>Crear categorías de votación</Text>
      <View style={s.row}>
        <TextInput placeholder="Categoría (ej: Mejor arquero)" value={category} onChangeText={setCategory} style={s.input} />
        <Pressable onPress={addCategory} style={s.btn}><Text>Agregar</Text></Pressable>
      </View>
      <Text style={s.h2}>Categorías</Text>
      {state.voteCategories.map(c=>(<Text key={c.id}>• {c.title} {c.isOpen ? '(abierta)' : '(cerrada)'}</Text>))}
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,padding:16,gap:10},
  title:{fontSize:20,fontWeight:'700'},
  h2:{marginTop:6, fontWeight:'600'},
  row:{flexDirection:'row', alignItems:'center', gap:8, marginVertical:4},
  input:{borderWidth:1,borderRadius:8,padding:8, flex:1},
  btn:{borderWidth:1,borderRadius:8,paddingHorizontal:10, paddingVertical:6},
  pill:{borderWidth:1,borderRadius:20,paddingHorizontal:10, paddingVertical:6, marginRight:8},
  pillOn:{backgroundColor:'#eee'}
});