import { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';
import { useAppState } from '@/lib/state';

export default function FindServicesScreen() {
    const { services, vendors } = useAppState();
    const [query, setQuery] = useState('');

    const results = useMemo(() => {
        const q = query.toLowerCase();
        return services.filter(s => s.title.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    }, [services, query]);

    function vendorNameFor(id?: string) {
        const v = vendors.find(x => x.id === id);
        return v?.name ?? 'Independent';
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Services</Text>
            <TextInput placeholder="Search by title or category" value={query} onChangeText={setQuery} style={styles.input} />
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable accessibilityRole="button" onPress={() => {}} style={styles.card}>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text>{item.category} • ${item.priceUsd.toFixed(2)} • {vendorNameFor(item.ownerVendorId)}</Text>
                    </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                ListEmptyComponent={<Text>No services yet. Post one!</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 12 },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 12 },
    card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 10 },
    cardTitle: { fontWeight: '700', marginBottom: 4 }
});

