import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { useAppState } from '@/lib/state';

export default function RequestsScreen() {
    const { requests } = useAppState();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Requests</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable accessibilityRole="button" onPress={() => Alert.alert('Request', item.description)} style={styles.card}>
                        <Text style={styles.cardTitle}>${item.budgetUsd.toFixed(2)} • {item.location}</Text>
                        <Text numberOfLines={2}>{item.description}</Text>
                    </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                ListEmptyComponent={<Text>No requests yet. Post one!</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
    card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 10 },
    cardTitle: { fontWeight: '700', marginBottom: 4 }
});

