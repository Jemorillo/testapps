import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useStore } from '@/context/store';

export default function History(){
  const { state } = useStore();
  const matches = [...state.matches].sort((a,b)=>b.dateISO.localeCompare(a.dateISO));
  return (
    <View style={s.container}>
      <Text style={s.title}>Historial y tabla</Text>
      <FlatList
        data={matches}
        keyExtractor={(m)=>m.id}
        renderItem={({item})=>{
          const aGoals = item.goals.filter(g=>item.teamA.playerIds.includes(g.playerId)).length;
          const bGoals = item.goals.filter(g=>item.teamB.playerIds.includes(g.playerId)).length;
          return (
            <View style={s.card}>
              <Text>{new Date(item.dateISO).toLocaleString()} - {item.place}</Text>
              <Text style={{fontWeight:'600'}}>{item.teamA.name} {aGoals} - {bGoals} {item.teamB.name}</Text>
            </View>
          );
        }}
        ListEmptyComponent={<Text>Aún no hay partidos.</Text>}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,padding:16,gap:8},
  title:{fontSize:20,fontWeight:'700'},
  card:{borderWidth:1,borderRadius:10,padding:10, marginVertical:6}
});