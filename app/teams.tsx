import React from 'react';
import { View, Text, Pressable, FlatList, TextInput, StyleSheet } from 'react-native';
import { useStore } from '@/context/store';
import { Match, Team } from '@/lib/types';
import { scheduleMatchReminders } from '@/lib/notifications';

function uid(){ return Math.random().toString(36).slice(2); }

export default function Teams() {
  const { state, dispatch } = useStore();
  const [date, setDate] = React.useState(''); // ISO like 2025-09-01T19:00
  const [place, setPlace] = React.useState('Cancha 1');
  const [price, setPrice] = React.useState('0');
  const [teamAColor, setTeamAColor] = React.useState('#1E90FF');
  const [teamBColor, setTeamBColor] = React.useState('#DC143C');

  const [teamAIds, setTeamAIds] = React.useState<string[]>([]);
  const [teamBIds, setTeamBIds] = React.useState<string[]>([]);

  function toggle(id: string, team: 'A'|'B') {
    if (team === 'A') {
      setTeamAIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
      setTeamBIds(prev => prev.filter(x=>x!==id));
    } else {
      setTeamBIds(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
      setTeamAIds(prev => prev.filter(x=>x!==id));
    }
  }

  function createMatch() {
    const teamA: Team = { id: uid(), name: 'Equipo A', color: teamAColor, playerIds: teamAIds };
    const teamB: Team = { id: uid(), name: 'Equipo B', color: teamBColor, playerIds: teamBIds };
    const m: Match = {
      id: uid(),
      dateISO: date || new Date().toISOString(),
      place,
      pricePerPlayer: Number(price||0),
      teamA, teamB,
      played: false,
      goals: [],
      voteCategoryIds: [],
    };
    dispatch({ type:'ADD_MATCH', payload: m });
    // schedule local reminders (native only)
    const when = new Date(m.dateISO);
    scheduleMatchReminders(when, `Partido en ${place}`);
  }

  return (
    <View style={s.container}>
      <Text style={s.title}>Crear encuentro y asignar equipos</Text>
      <View style={s.row}>
        <TextInput placeholder="Fecha ISO (2025-09-01T19:00)" style={s.input} value={date} onChangeText={setDate} />
      </View>
      <View style={s.row}>
        <TextInput placeholder="Lugar" style={s.input} value={place} onChangeText={setPlace} />
        <TextInput placeholder="Pago por jugador" style={s.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
      </View>
      <View style={s.row}>
        <TextInput placeholder="Color Equipo A (#hex)" style={s.input} value={teamAColor} onChangeText={setTeamAColor} />
        <TextInput placeholder="Color Equipo B (#hex)" style={s.input} value={teamBColor} onChangeText={setTeamBColor} />
      </View>
      <Text style={s.h2}>Selecciona jugadores</Text>
      <FlatList
        data={state.players}
        keyExtractor={(p)=>p.id}
        renderItem={({item})=>{
          const a = teamAIds.includes(item.id);
          const b = teamBIds.includes(item.id);
          return (
            <View style={s.playerRow}>
              <Text style={{flex:1}}>{item.nickname}</Text>
              <Pressable style={[s.badge, a && s.badgeOn]} onPress={()=>toggle(item.id,'A')}><Text>A</Text></Pressable>
              <Pressable style={[s.badge, b && s.badgeOn]} onPress={()=>toggle(item.id,'B')}><Text>B</Text></Pressable>
            </View>
          )
        }}
      />
      <Pressable onPress={createMatch} style={s.btn}><Text>Crear encuentro</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,padding:16,gap:10},
  title:{fontSize:20,fontWeight:'700'},
  h2:{marginTop:6, fontWeight:'600'},
  row:{flexDirection:'row', gap:8},
  input:{borderWidth:1,borderRadius:8,padding:8, flex:1},
  playerRow:{flexDirection:'row', alignItems:'center', paddingVertical:6, borderBottomWidth:1},
  badge:{borderWidth:1, borderRadius:8, paddingHorizontal:10, paddingVertical:6, marginHorizontal:4},
  badgeOn:{backgroundColor:'#ddd'},
  btn:{marginTop:10, borderWidth:1, borderRadius:10, padding:10, alignItems:'center'}
});