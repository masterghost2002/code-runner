export default function getLanguageFromFilename(filename: string | undefined): string {
    // Extract the file extension
    if(!filename) return 'text';
    const fileExtension = filename.split('.').pop()?.toLowerCase();
    
    if (!fileExtension) {
        return 'text'; // If no extension found
    }

    // Define mapping of file extensions to language names
    const languageMap: { [key: string]: string } = {
        'tsx':'typescript',
        'jsx':'javascript',
        'ts': 'typescript',
        'js': 'javascript',
        'py': 'python',
        'css':'css',
        'html':'html',
        'json':'json',
        'md':'markdown',
        'cpp':'cpp',
        'c++':'cpp',
        'c':'c',
        'cjs':'javascript'
        // Add more extensions and corresponding language names as needed
    };

    // Lookup the language name based on the file extension
    const language = languageMap[fileExtension];

    // Return the language name or null if not found
    return language || fileExtension;
}
