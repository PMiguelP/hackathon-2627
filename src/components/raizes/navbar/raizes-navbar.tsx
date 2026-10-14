import { router } from "expo-router";
import { useTabTrigger } from "expo-router/ui";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CoracaoViana } from "@/components/raizes/coracao-viana";
import { Icon } from "@/components/raizes/icon";
import { NAV_CENTER, NAV_TABS, type NavTab } from "@/config/navigation";
import {
	RaizesNavbar as NavTokens,
	RaizesColors,
	RaizesLayout,
	RaizesShadow,
	RaizesType,
} from "@/constants/raizes-theme";

function NavItem({ tab }: { tab: NavTab }) {
	const { triggerProps } = useTabTrigger({ name: tab.name, href: tab.href });
	const active = triggerProps.isFocused;
	const color = active ? NavTokens.activeColor : NavTokens.inactiveColor;

	return (
		<Pressable
			accessibilityRole="tab"
			accessibilityState={{ selected: active }}
			accessibilityLabel={tab.label}
			onPress={triggerProps.onPress}
			onLongPress={triggerProps.onLongPress}
			style={({ pressed }) => [styles.item, pressed && styles.pressed]}
		>
			<Icon name={active ? tab.iconActive : tab.icon} size={22} color={color} />
			<Text
				style={[styles.label, { color }, active && styles.labelActive]}
				numberOfLines={1}
			>
				{tab.label}
			</Text>
		</Pressable>
	);
}

function CenterHeart() {
	return (
		<View style={styles.centerSlot}>
			<Pressable
				accessibilityRole="button"
				accessibilityLabel={NAV_CENTER.accessibilityLabel}
				onPress={() => router.push(NAV_CENTER.href)}
				style={({ pressed }) => [
					styles.centerButton,
					pressed && styles.centerPressed,
				]}
			>
				<View style={styles.centerInnerRing}>
					<CoracaoViana size={40} />
				</View>
			</Pressable>
		</View>
	);
}

export function RaizesNavbar() {
	const insets = useSafeAreaInsets();
	const half = Math.ceil(NAV_TABS.length / 2);

	// Em mobile nativo (iOS/Android), usa o inset da home bar (ex: ~12-16px).
	// Em web, um padding pequeno de 8px chega para não empurrar a barra para cima.
	const bottomPadding = Platform.OS === "web" ? 8 : Math.max(insets.bottom, 8);

	return (
		<View style={[styles.outer, { paddingBottom: bottomPadding }]}>
			<View style={styles.bar}>
				{NAV_TABS.slice(0, half).map((t) => (
					<NavItem key={t.name} tab={t} />
				))}
				<CenterHeart />
				{NAV_TABS.slice(half).map((t) => (
					<NavItem key={t.name} tab={t} />
				))}
			</View>
		</View>
	);
}

const CENTER = 54;

const styles = StyleSheet.create({
	outer: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: NavTokens.background,
		borderTopLeftRadius: 22,
		borderTopRightRadius: 22,
		borderTopWidth: 1,
		borderColor: RaizesColors.ouroLinha,
		boxShadow: RaizesShadow.navbar,
		zIndex: 99,
	},
	bar: {
		height: 56, // Altura enxuta e elegante no rodapé
		width: "100%",
		maxWidth: RaizesLayout.maxWidth,
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 8,
	},
	item: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
		paddingVertical: 4,
	},
	label: {
		fontSize: 11,
		fontWeight: RaizesType.weight.medium,
		lineHeight: 14,
	},
	labelActive: {
		fontWeight: RaizesType.weight.bold,
	},
	pressed: {
		opacity: 0.6,
	},

	centerSlot: {
		width: CENTER + 12,
		alignItems: "center",
	},
	centerButton: {
		marginTop: -22, // Sobe com elegância acima da barra
		width: CENTER,
		height: CENTER,
		borderRadius: CENTER / 2,
		backgroundColor: NavTokens.background,
		borderWidth: 1.5,
		borderColor: RaizesColors.ouroLinha,
		alignItems: "center",
		justifyContent: "center",
		boxShadow: RaizesShadow.gold,
	},
	centerInnerRing: {
		width: CENTER - 8,
		height: CENTER - 8,
		borderRadius: (CENTER - 8) / 2,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: RaizesColors.ouro,
		alignItems: "center",
		justifyContent: "center",
	},
	centerPressed: {
		transform: [{ scale: 0.95 }],
	},
});
