import { Link } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useStore } from '@/context/store';

export default function Home() {
  const { state, dispatch } = useStore();
  const next = [...state.matches].sort((a,b)=>a.dateISO.localeCompare(b.dateISO))[0];
  return (
    <View style={s.container}>
      <Text style={s.title}>Weekly Match</Text>
      {next ? (
        <View style={s.card}>
          <Text style={s.h2}>Próximo encuentro</Text>
          <Text>Fecha: {new Date(next.dateISO).toLocaleString()}</Text>
          <Text>Lugar: {next.place}</Text>
          <Text>Pago por jugador: ${next.pricePerPlayer.toFixed(2)}</Text>
        </View>
      ) : (
        <Text>No hay encuentros programados.</Text>
      )}
      <View style={s.links}>
        <Link href="/players" asChild><Pressable style={s.btn}><Text style={s.btnText}>Jugadores</Text></Pressable></Link>
        <Link href="/teams" asChild><Pressable style={s.btn}><Text style={s.btnText}>Equipos</Text></Pressable></Link>
        <Link href="/admin" asChild><Pressable style={s.btn}><Text style={s.btnText}>Admin</Text></Pressable></Link>
        <Link href="/history" asChild><Pressable style={s.btn}><Text style={s.btnText}>Historial</Text></Pressable></Link>
      </View>
      <Pressable style={[s.btn, s.switch]} onPress={()=>dispatch({type:'TOGGLE_ADMIN'})}>
        <Text style={s.btnText}>{state.adminMode ? 'Admin ON' : 'Admin OFF'}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1, padding:16, gap:12, justifyContent:'center', alignItems:'center'},
  title:{fontSize:28, fontWeight:'bold', marginBottom:10},
  card:{padding:12, borderWidth:1, borderRadius:12, width:'100%', maxWidth:420},
  h2:{fontSize:18, fontWeight:'600', marginBottom:6},
  links:{flexDirection:'row', flexWrap:'wrap', gap:8, justifyContent:'center'},
  btn:{paddingVertical:10, paddingHorizontal:14, borderRadius:10, borderWidth:1},
  btnText:{fontWeight:'600'},
  switch:{marginTop:8}
});