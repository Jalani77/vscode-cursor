import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function Home() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>CampusXATL (Expo)</Text>
            <Link href="/vendors">Browse Vendors</Link>
            <Link href="/post-service">Post a Service</Link>
            <Link href="/post-request">Post a Request</Link>
            <Link href="/requests">View Requests</Link>
            <Pressable accessibilityRole="button" onPress={() => {}} style={styles.cta}><Text style={styles.ctaText}>CTA</Text></Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	title: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
    cta: { marginTop: 16, backgroundColor: '#2A6EF2', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
    ctaText: { color: '#fff', fontWeight: '600' }
});