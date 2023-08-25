export function updatePlayerPacket(x: number, y: number, toolId: number, selectedColor: [number, number, number]) {
    const array = new ArrayBuffer(12);
    const dv = new DataView(array);
    
    dv.setInt32(0, x * 16, true);
    dv.setInt32(4, x * 16, true);
    dv.setUint8(8, selectedColor[0]);
    dv.setUint8(9, selectedColor[1]);
    dv.setUint8(10, selectedColor[2]);
    dv.setUint8(11, toolId);
    
    return array;
}