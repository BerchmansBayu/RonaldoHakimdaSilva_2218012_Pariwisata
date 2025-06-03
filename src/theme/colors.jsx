const colors = {
    sand: (opacity = 1) => `rgba(237, 201, 175, ${opacity})`, // Warna pasir pantai
    oceanBlue: (opacity = 1) => `rgba(0, 122, 204, ${opacity})`, // Biru laut yang segar
    sunsetOrange: (opacity = 1) => `rgba(255, 94, 77, ${opacity})`, // Warna matahari terbenam
    palmGreen: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // Hijau pohon kelapa
    skyBlue: (opacity = 1) => `rgba(135, 206, 235, ${opacity})`, // Biru langit cerah
    darkModeNavy: (opacity = 1) => `rgba(25, 25, 112, ${opacity})`, // Warna biru gelap untuk dark mode
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Tetap putih untuk teks atau background
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Hitam tetap ada untuk teks kontras
};

export default colors;

