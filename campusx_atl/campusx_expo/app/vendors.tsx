import { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, Modal, StyleSheet } from 'react-native';
import { useAppState, Vendor } from '@/lib/state';

export default function VendorsScreen() {
    const { vendors } = useAppState();
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<Vendor | null>(null);

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return vendors.filter(v => v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q));
    }, [vendors, query]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Vendors</Text>
            <TextInput placeholder="Search vendors" value={query} onChangeText={setQuery} style={styles.input} />
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable accessibilityRole="button" onPress={() => setSelected(item)} style={styles.card}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text>{item.category} • {item.rating.toFixed(1)}★</Text>
                        <Text numberOfLines={2} style={styles.cardDesc}>{item.description}</Text>
                    </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />

            <Modal visible={!!selected} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
                <View style={styles.modalWrap}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>{selected?.name}</Text>
                        <Text>{selected?.category} • {selected?.rating.toFixed(1)}★</Text>
                        <Text style={{ marginVertical: 8 }}>{selected?.description}</Text>
                        <Pressable accessibilityRole="button" style={styles.button} onPress={() => setSelected(null)}>
                            <Text style={styles.buttonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
    card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 10 },
    cardTitle: { fontWeight: '700', fontSize: 16 },
    cardDesc: { color: '#555', marginTop: 4 },
    modalWrap: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 24 },
    modal: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
    modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
    button: { marginTop: 12, backgroundColor: '#2A6EF2', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: '700' }
});

