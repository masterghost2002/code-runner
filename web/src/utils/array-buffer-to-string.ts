export default function arrBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(buffer);
}