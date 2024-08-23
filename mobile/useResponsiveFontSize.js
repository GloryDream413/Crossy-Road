import { useEffect, useState } from 'react';

const useResponsiveFontSize = (defaultSize, mobileSize) => {
    const [fontSize, setFontSize] = useState(defaultSize);

    const updateFontSize = () => {
        if (window.innerWidth <= 600) {
            setFontSize(mobileSize);
        } else {
            setFontSize(defaultSize);
        }
    };

    useEffect(() => {
        updateFontSize(); // Set initial font size
        window.addEventListener('resize', updateFontSize); // Add resize event listener

        return () => {
            window.removeEventListener('resize', updateFontSize); // Cleanup listener
        };
    }, [defaultSize, mobileSize]);

    return fontSize;
};

export default useResponsiveFontSize;