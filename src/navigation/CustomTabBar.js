import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Text,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const TAB_BAR_MARGIN = 20;
const TAB_BAR_WIDTH = width - TAB_BAR_MARGIN * 2;

const SPRING_CONFIG = {
    damping: 18,
    stiffness: 220,
    mass: 0.7,
};

function TabButton({
    route,
    index,
    isFocused,
    options,
    navigation,
    tabWidth,
    getIconName,
}) {
    const animatedIconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withSpring(isFocused ? 1.18 : 1, SPRING_CONFIG),
                },
                {
                    translateY: withSpring(isFocused ? -18 : 0, SPRING_CONFIG),
                },
            ],
        };
    }, [isFocused]);

    const labelStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isFocused ? 1 : 0.65, {
                duration: 150,
            }),
            transform: [
                {
                    translateY: withTiming(isFocused ? 8 : 0, {
                        duration: 150,
                    }),
                },
            ],
        };
    }, [isFocused]);

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[
                styles.tabItem,
                {
                    width: tabWidth,
                },
            ]}>
            <Animated.View
                style={[
                    styles.iconWrapper,
                    isFocused && styles.activeIconWrapper,
                    animatedIconStyle,
                ]}>
                <Icon
                    name={options.tabBarIconName || getIconName(route.name)}
                    size={23}
                    color={isFocused ? '#ffffff' : '#8E8E93'}
                />
            </Animated.View>

            <Animated.Text
                numberOfLines={1}
                style={[
                    styles.routeLabel,
                    {
                        color: isFocused ? '#344e41' : '#8E8E93',
                    },
                    labelStyle,
                ]}>
                {route.name}
            </Animated.Text>
        </TouchableOpacity>
    );
}

export default function CustomTabBar({ state, descriptors, navigation }) {
    const insets = useSafeAreaInsets();
    const tabWidth = TAB_BAR_WIDTH / state.routes.length;

    const indicatorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: withSpring(state.index * tabWidth, SPRING_CONFIG),
                },
            ],
        };
    }, [state.index, tabWidth]);

    const getIconName = routeName => {
        switch (routeName) {
            case 'Home':
                return 'home-outline';
            case 'Recipe':
                return 'fast-food-outline';
            case 'Shop':
                return 'storefront-outline';
            case 'Profile':
                return 'person-outline';
            default:
                return 'ellipse-outline';
        }
    };

    return (
        <View
            style={[
                styles.wrapper,
                {
                    bottom: Math.max(insets.bottom, 12),
                },
            ]}>
            <View style={styles.tabBar}>
                <Animated.View
                    style={[
                        styles.indicator,
                        {
                            width: tabWidth,
                        },
                        indicatorStyle,
                    ]}>
                    <View style={styles.indicatorCircle} />
                </Animated.View>

                {state.routes.map((route, index) => {
                    const isFocused = state.index === index;
                    const { options } = descriptors[route.key];

                    return (
                        <TabButton
                            key={route.key}
                            route={route}
                            index={index}
                            isFocused={isFocused}
                            options={options}
                            navigation={navigation}
                            tabWidth={tabWidth}
                            getIconName={getIconName}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: TAB_BAR_MARGIN,
        right: TAB_BAR_MARGIN,
        zIndex: 999,
    },
    tabBar: {
        width: TAB_BAR_WIDTH,
        height: 78,
        borderRadius: 39,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 18,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        elevation: 10,
        overflow: 'visible',
    },
    tabItem: {
        height: 78,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        position: 'absolute',
        height: 78,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorCircle: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#588157',
        transform: [{ translateY: -18 }],
    },
    iconWrapper: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIconWrapper: {
        backgroundColor: '#344e41',
    },
    routeLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: -4,
    },
});