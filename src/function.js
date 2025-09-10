
export function descriptionMeteo(code) {
  switch (code) {
    case 0:
      return "images/soleil.png"//"Ciel dégagé";

    case 1:
    case 2:
    case 3:
      return "images/soleil_nuage.png"//"Principalement dégagé, partiellement nuageux, couvert";
    case 45:
    case 48:
      return "images/brouillard.png"//"Brouillard et brouillard givrant";

    case 51:
    case 53:
    case 55:
      return "images/nuage.png"//"Bruine : faible, modérée, forte intensité";

    case 56:
    case 57:
      return "images/nuage.png"//"Bruine verglaçante : faible et forte intensité";

    case 61:
    case 63:
    case 65:
      return "images/pluie.png"//"Pluie : faible, modérée, forte intensité";

    case 66:
    case 67:
      return "images/pluie.png"//"Pluie verglaçante : faible et forte intensité";

    case 71:
    case 73:
    case 75:
      return "images/neige.png"//"Chute de neige : faible, modérée, forte intensité";

    case 77:
      return "images/neige.png"//"Grains de neige";

    case 80:
    case 81:
    case 82:
      return "images/pluie.png"//"Averses de pluie : faible, modérée, violente";

    case 85:
    case 86:
      return "images/neige.png"//"Averses de neige : faible et forte";

    case 95:
      return "images/orage.png"//"Orage : faible ou modéré";

    case 96:
    case 99:
      return "images/orage_grele.png"//"Orage avec grêle : faible ou forte";

    default:
      return "Code météo inconnu";
  }
}