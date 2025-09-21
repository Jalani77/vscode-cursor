import React, { createContext, useContext, useMemo, useState } from 'react';

export type Vendor = {
	id: string;
	name: string;
	category: string;
	description: string;
	rating: number;
};

export type Service = {
	id: string;
	title: string;
	category: string;
	priceUsd: number;
	ownerVendorId?: string;
};

export type ServiceRequest = {
	id: string;
	description: string;
	location: string;
	budgetUsd: number;
	photos?: string[];
};

type AppState = {
	vendors: Vendor[];
	services: Service[];
	requests: ServiceRequest[];
	addVendor: (vendor: Omit<Vendor, 'id'>) => void;
	addService: (service: Omit<Service, 'id'>) => void;
	addRequest: (request: Omit<ServiceRequest, 'id'>) => void;
};

const AppStateContext = createContext<AppState | undefined>(undefined);

function generateId(prefix: string): string {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [vendors, setVendors] = useState<Vendor[]>([
		{ id: 'v_hair', name: 'Kia the Stylist', category: 'Hair', description: 'Braids, silk press, locs', rating: 4.9 },
		{ id: 'v_phone', name: 'GSU PhoneFix', category: 'Repair', description: 'Screens, batteries, speakers', rating: 4.7 },
		{ id: 'v_tutor', name: 'Math Wiz', category: 'Tutoring', description: 'Calc, Stats, Linear Algebra', rating: 4.8 },
	]);
	const [services, setServices] = useState<Service[]>([]);
	const [requests, setRequests] = useState<ServiceRequest[]>([]);

	const addVendor = (vendor: Omit<Vendor, 'id'>) => {
		setVendors((prev) => [...prev, { ...vendor, id: generateId('v') }]);
	};

	const addService = (service: Omit<Service, 'id'>) => {
		setServices((prev) => [...prev, { ...service, id: generateId('s') }]);
	};

	const addRequest = (request: Omit<ServiceRequest, 'id'>) => {
		setRequests((prev) => [...prev, { ...request, id: generateId('r') }]);
	};

	const value = useMemo<AppState>(
		() => ({ vendors, services, requests, addVendor, addService, addRequest }),
		[vendors, services, requests]
	);

	return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export function useAppState(): AppState {
	const ctx = useContext(AppStateContext);
	if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
	return ctx;
}

