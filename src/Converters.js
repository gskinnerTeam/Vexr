export default class Convert {
    
    static RadiansToDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    static DegreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    static MapRange(value, bottomA, topA, bottomB, topB) {
        return bottomB + (topB - bottomB) * (value - bottomA) / (topA - bottomA);
    }

}
