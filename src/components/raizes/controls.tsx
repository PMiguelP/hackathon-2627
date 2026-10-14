import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { forwardRef, useState, type ReactNode } from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
	type TextInputProps,
} from "react-native";

import { Raizes } from "@/constants/raizes-theme";
import { Fonts } from "@/constants/theme";

type IconName = SymbolViewProps["name"];

/* -------------------------------------------------------------------------- */
/*  Campo de texto                                                             */
/* -------------------------------------------------------------------------- */

type FieldProps = TextInputProps & {
	label: string;
	icon: IconName;
	error?: string;
	right?: ReactNode;
};

export const RaizesField = forwardRef<TextInput, FieldProps>(
	function RaizesField(
		{ label, icon, error, right, style, onFocus, onBlur, ...props },
		ref,
	) {
		const [focused, setFocused] = useState(false);
		const borderColor = error
			? Raizes.erro
			: focused
				? Raizes.ouro
				: Raizes.linhaOuro;

		return (
			<View style={styles.fieldWrap}>
				<Text style={styles.label}>{label}</Text>
				<View
					style={[
						styles.field,
						{
							borderColor,
							backgroundColor: focused ? Raizes.campoFoco : Raizes.campo,
						},
					]}
				>
					<SymbolView
						name={icon}
						size={18}
						tintColor={focused ? Raizes.ouroClaro : Raizes.ouro}
					/>
					<TextInput
						ref={ref}
						placeholderTextColor={Raizes.linhoTenue}
						selectionColor={Raizes.ouro}
						cursorColor={Raizes.ouro}
						style={[styles.input, style]}
						onFocus={(e) => {
							setFocused(true);
							onFocus?.(e);
						}}
						onBlur={(e) => {
							setFocused(false);
							onBlur?.(e);
						}}
						{...props}
					/>
					{right}
				</View>
				{error ? <Text style={styles.error}>{error}</Text> : null}
			</View>
		);
	},
);

/* -------------------------------------------------------------------------- */
/*  Botões                                                                     */
/* -------------------------------------------------------------------------- */

export function GoldButton({
	title,
	onPress,
	loading,
}: {
	title: string;
	onPress: () => void;
	loading?: boolean;
}) {
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={title}
			onPress={onPress}
			disabled={loading}
			style={({ pressed }) => [styles.gold, pressed && styles.goldPressed]}
		>
			{/* brilho superior, imita o metal polido */}
			<View style={styles.goldShine} pointerEvents="none" />
			{loading ? (
				<ActivityIndicator color={Raizes.vinho900} />
			) : (
				<Text style={styles.goldText}>{title}</Text>
			)}
		</Pressable>
	);
}

export function OutlineButton({
	title,
	icon,
	onPress,
}: {
	title: string;
	icon?: ReactNode;
	onPress: () => void;
}) {
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={title}
			onPress={onPress}
			style={({ pressed }) => [
				styles.outline,
				pressed && styles.outlinePressed,
			]}
		>
			{icon}
			<Text style={styles.outlineText}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	fieldWrap: { gap: 6 },
	label: {
		color: Raizes.linhoSuave,
		fontSize: 12,
		fontWeight: "600",
		letterSpacing: 1.2,
		textTransform: "uppercase",
		marginLeft: 4,
	},
	field: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		height: 52,
		paddingHorizontal: 16,
		borderRadius: 14,
		borderWidth: 1,
	},
	input: {
		flex: 1,
		height: "100%",
		color: Raizes.linho,
		fontSize: 16,
		fontFamily: Fonts?.sans,
		outlineStyle: "none",
	} as object,
	error: { color: Raizes.erro, fontSize: 12, marginLeft: 4 },

	gold: {
		height: 54,
		borderRadius: 27,
		backgroundColor: Raizes.ouro,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		borderWidth: 1,
		borderColor: Raizes.ouroClaro,
		boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
	},
	goldPressed: {
		transform: [{ scale: 0.985 }],
		backgroundColor: Raizes.ouroEscuro,
	},
	goldShine: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: "45%",
		backgroundColor: "rgba(255, 244, 214, 0.14)",
	},
	goldText: {
		color: Raizes.vinho900,
		fontSize: 17,
		fontWeight: "700",
		letterSpacing: 0.6,
	},

	outline: {
		flex: 1,
		height: 48,
		borderRadius: 24,
		borderWidth: 1,
		borderColor: Raizes.linhaOuro,
		backgroundColor: Raizes.campo,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 8,
	},
	outlinePressed: {
		borderColor: Raizes.ouro,
		backgroundColor: Raizes.campoFoco,
	},
	outlineText: { color: Raizes.linho, fontSize: 15, fontWeight: "600" },
});
