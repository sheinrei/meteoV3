
export default function logBanner() {
    const Sheinrei = {
        banner() {
            const banner = `
%c
  ███████╗██╗  ██╗███████╗██╗███╗   ██╗██████╗ ███████╗██╗
  ██╔════╝██║  ██║██╔════╝██║████╗  ██║██╔══██╗██╔════╝██║
  ███████╗███████║█████╗  ██║██╔██╗ ██║██████╔╝█████╗  ██║
  ╚════██║██╔══██║██╔══╝  ██║██║╚██╗██║██╔══██╗██╔══╝  ██║
  ███████║██║  ██║███████╗██║██║ ╚████║██║  ██║███████╗██║
  ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝
                                                           
            🚀 SheinreiCorp ©2025 🚀
`;
            console.log(banner, 'color: #Ff6b6b; font-family: monospace; font-weight: bold; text-shadow: 0 0 10px #ff6b6b;');
        },

    };


    Sheinrei.banner();
}

