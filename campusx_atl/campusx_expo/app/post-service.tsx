import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAppState } from '@/lib/state';

export default function PostServiceScreen() {
    const { addService, vendors, addVendor } = useAppState();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [status, setStatus] = useState('');

    const submit = () => {
        const priceUsd = parseFloat(price) || 0;
        let ownerVendorId: string | undefined;
        if (vendorName.trim().length > 0) {
            const existing = vendors.find(v => v.name.toLowerCase() === vendorName.trim().toLowerCase());
            if (existing) ownerVendorId = existing.id;
            else {
                const prevLen = vendors.length;
                addVendor({ name: vendorName.trim(), category, description: `${vendorName} services`, rating: 5.0 });
                // naive: pick last inserted as owner
                ownerVendorId = undefined;
            }
        }
        addService({ title, category, priceUsd, ownerVendorId });
        setStatus('Service posted!');
        setTitle(''); setCategory(''); setPrice(''); setVendorName('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Post a Service</Text>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
            <TextInput placeholder="Price (USD)" value={price} onChangeText={setPrice} keyboardType="decimal-pad" style={styles.input} />
            <TextInput placeholder="Vendor Name (optional)" value={vendorName} onChangeText={setVendorName} style={styles.input} />
            <Button title="Post" onPress={submit} />
            {status ? <Text style={styles.status}>{status}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    title: { fontSize: 24, fontWeight: '700' },
    input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8 },
    status: { color: 'green', marginTop: 8 }
});

