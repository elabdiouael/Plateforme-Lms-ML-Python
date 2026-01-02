export const courses = [
  // ============================================================
  // CHAPITRE 1: FLUX DE CONTRÔLE (DECISION MAKING)
  // ============================================================
  {
    type: 'theory',
    title: "Chapitre 1: Le Cerveau de l'IA (Conditions)",
    content: "Un algorithme, c'est comme un Risk Manager : il doit prendre des décisions.\n\n- **IF / ELSE** : La base.\n- **MATCH** (Python 3.10+) : L'évolution du 'Switch'. C'est crucial pour classifier des données (ex: Catégoriser des clients)."
  },
  {
    type: 'interactive-code',
    title: "Le Switch Moderne: Match Case",
    code: `http_status = 404

# Structure propre pour classifier
match http_status:
    case 200 | 201:
        print("Succès (OK)")
    case 400:
        print("Erreur Client (Bad Request)")
    case 404:
        print("Ressource non trouvée")
    case 500 | 503:
        print("Erreur Serveur (Urgent)")
    case _:
        print("Code Inconnu")`,
    explanations: [
      { line: 4, text: "'match' remplace les longues chaînes de if/elif. C'est plus lisible." },
      { line: 5, text: "Le '|' (pipe) signifie OU. On groupe 200 et 201 ensemble." },
      { line: 11, text: "Le tiret du bas '_' est le cas par défaut (Wildcard). Il capture tout le reste." }
    ]
  },

  // ============================================================
  // CHAPITRE 2: LES BOUCLES (ITERATION)
  // ============================================================
  {
    type: 'theory',
    title: "Chapitre 2: Automatiser avec les Boucles",
    content: "En Machine Learning, on traite des millions de lignes. On ne copie-colle jamais le code.\n\n- **FOR** : Quand on connait la taille (ex: Liste de prix).\n- **WHILE** : Quand on ne sait pas quand ça s'arrête (ex: Attendre une connexion)."
  },
  {
    type: 'interactive-code',
    title: "Nettoyage de Données (Loop Control)",
    code: `data = [100, -5, 0, 200, 50]
clean_data = []

for val in data:
    # 1. Sauter les valeurs inutiles
    if val == 0:
        continue 
    
    # 2. Arrêt d'urgence (Sécurité)
    if val < 0:
        print("Erreur: Négatif trouvé!")
        break
        
    clean_data.append(val)

print(clean_data)`,
    explanations: [
      { line: 7, text: "'continue' dit : 'Passe au suivant immédiatement, ignore le code en dessous'." },
      { line: 11, text: "'break' dit : 'Arrête TOUTE la boucle'. On sort complètement." },
      { line: 14, text: "Cette ligne ne s'exécute que si on n'a pas fait 'continue' ou 'break'." }
    ]
  },

  // ============================================================
  // CHAPITRE 3: ADVANCED ITERATION (OUTILS INGÉNIEUR)
  // ============================================================
  {
    type: 'theory',
    title: "Chapitre 3: L'Itération Intelligente",
    content: "Un débutant fait `i = i + 1`. Un ingénieur utilise les outils natifs.\n\n- **ENUMERATE** : Pour avoir l'index ET la valeur (Vital pour savoir où est l'erreur).\n- **ZIP** : Pour scotcher deux listes ensemble."
  },
  {
    type: 'interactive-code',
    title: "Enumerate & Zip",
    code: `noms = ["Produit A", "Produit B"]
prix = [100, 250]

# Mauvaise méthode: utiliser range(len(..))
# Bonne méthode: ZIP
for n, p in zip(noms, prix):
    print(f"{n} coûte {p} DH")

# Avoir l'index pour le log
for i, n in enumerate(noms):
    print(f"Ligne {i}: Traitement de {n}...")`,
    explanations: [
      { line: 6, text: "'zip' prend deux listes et les parcourt en parallèle (comme une fermeture éclair)." },
      { line: 10, text: "'enumerate' renvoie un tuple (index, valeur). Plus besoin de compteur manuel." }
    ]
  },

  // ============================================================
  // CHAPITRE 4: FONCTIONS & MODULARITÉ
  // ============================================================
  {
    type: 'theory',
    title: "Chapitre 4: Architecture (Fonctions)",
    content: "DRY : Don't Repeat Yourself.\nUne fonction doit faire UNE seule chose.\n\n**Risk Management :** On utilise le 'Type Hinting' pour forcer la structure des données."
  },
  {
    type: 'interactive-code',
    title: "Fonction Robuste (Typée)",
    code: `def calculer_marge(cout: float, prix: float) -> float:
    """Calcule la marge bénéficiaire"""
    if prix < cout:
        return 0.0
    
    marge = prix - cout
    return marge

# Appel
p1 = calculer_marge(10.5, 15.0)
p2 = calculer_marge(prix=20.0, cout=50.0) # Nommé`,
    explanations: [
      { line: 1, text: "'cout: float' indique qu'on attend un nombre décimal." },
      { line: 1, text: "'-> float' promet que la fonction renverra un décimal." },
      { line: 4, text: "Le 'return' arrête la fonction. Si prix < cout, on ne calcule même pas la suite." },
      { line: 9, text: "On peut appeler les arguments par leur nom (keyword arguments) pour éviter les inversions." }
    ]
  },

  // ============================================================
  // CHAPITRE 5: MÉMOIRE & POINTEURS (LE PIÈGE)
  // ============================================================
  {
    type: 'theory',
    title: "Chapitre 5: La Mémoire (Pointeurs)",
    content: "C'est l'erreur #1 des débutants en Data Science.\n\nEn Python, `a = b` ne copie PAS la valeur. Ça copie l'adresse (le pointeur).\nSi tu modifies la copie, tu détruis l'original."
  },
  {
    type: 'interactive-code',
    title: "Référence vs Copie",
    code: `original = [1, 2, 3]

# 1. Le Piège (Référence)
ref = original
ref[0] = 99
# original devient [99, 2, 3] aussi !

# 2. La Solution (Copie)
original = [1, 2, 3] # Reset
copie = original.copy()
copie[0] = 99

# original reste [1, 2, 3]`,
    explanations: [
      { line: 4, text: "'ref' pointe vers la MÊME case mémoire que 'original'. C'est le même objet." },
      { line: 10, text: ".copy() crée une NOUVELLE liste ailleurs dans la mémoire (Heap)." },
      { line: 11, text: "Modifier la copie ne touche plus à l'original. Ouf !" }
    ]
  },

  // ============================================================
  // CHAPITRE 6: LIST COMPREHENSION (PYTHONIC WAY)
  // ============================================================
  {
    type: 'theory',
    title: "Chapitre 6: List Comprehension",
    content: "Comment transformer 5 lignes de code en 1 seule ?\nC'est la méthode 'Pythonic'. C'est plus rapide à écrire et souvent plus rapide à exécuter."
  },
  {
    type: 'interactive-code',
    title: "Filtrage One-Liner",
    code: `raw_prices = [10, 55, 100, 33]

# Méthode Classique (Lente à écrire)
res = []
for p in raw_prices:
    if p > 50:
        res.append(p * 0.8) # Remise 20%

# Méthode Pythonic (1 ligne)
# [ACTION for VAR in LISTE if CONDITION]
fast_res = [p * 0.8 for p in raw_prices if p > 50]`,
    explanations: [
      { line: 11, text: "Lecture : 'Prends p * 0.8, POUR CHAQUE p dans la liste, SI p > 50'." },
      { line: 11, text: "C'est la base pour comprendre NumPy et Pandas plus tard." }
    ]
  }
];
