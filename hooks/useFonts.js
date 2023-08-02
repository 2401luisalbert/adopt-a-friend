import { useState, useEffect } from "react";
import * as Font from 'expo-font';

export const useFonts = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
            });
            setFontLoaded(true);
        };

        loadFonts();
    }, []);

    return fontLoaded;
};
