import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useStore } from '@/context/store';

function uid(){ return Math.random().toString(36).slice(2); }

export default function Vote(){
  const { state, dispatch } = useStore();
  const latest = [...state.matches].sort((a,b)=>b.dateISO.localeCompare(a.dateISO))[0];
  if(!latest) return <View style={s.container}><Text>No hay partido.</Text></View>;
  const openCats = state.voteCategories.filter(c=>c.isOpen);

  function vote(catId: string, nomineeId: string){
    const v = { id: uid(), matchId: latest.id, categoryId: catId, voterId: 'me', nomineePlayerId: nomineeId, createdAt: Date.now() };
    dispatch({ type:'ADD_VOTE', payload: v });
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Votaciones</Text>
      <FlatList
        data={openCats}
        keyExtractor={(c)=>c.id}
        renderItem={({item})=>(
          <View style={s.card}>
            <Text style={{fontWeight:'600'}}>{item.title}</Text>
            {state.players.map(p=>(
              <Pressable key={p.id} onPress={()=>vote(item.id, p.id)} style={s.btn}><Text>Votar a {p.nickname}</Text></Pressable>
            ))}
          </View>
        )}
        ListEmptyComponent={<Text>No hay categorías abiertas.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,padding:16,gap:10},
  title:{fontSize:20,fontWeight:'700'},
  card:{borderWidth:1,borderRadius:10,padding:10, marginVertical:6},
  btn:{borderWidth:1,borderRadius:8,paddingHorizontal:10, paddingVertical:6, marginVertical:4}
});