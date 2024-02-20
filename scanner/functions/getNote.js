function getNote(key)
        {
            key = key.toUpperCase();

            switch (key)
            {
                // Middle row, maps to white keys
                case 'A': return 'C0';
                case 'S': return 'D0';
                case 'D': return 'E0';
                case 'F': return 'F0';
                case 'G': return 'G0';
                case 'H': return 'A0';
                case 'J': return 'B0';
                case 'K': return 'C1';
                case 'L': return 'D1';

                // Top row, black keys
                case 'W': return 'C#0';
                case 'E': return 'D#0';
                case 'T': return 'F#0';
                case 'Y': return 'G#0';
                case 'U': return 'A#0';
                case 'O': return 'C#1';

                default: return null;
            }
        }