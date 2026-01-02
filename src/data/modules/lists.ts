// src/data/modules/lists.ts

export const lists = [
  // ============================================================
  // SECTION 1: LISTES & MÉTHODES (L'ARSENAL)
  // ============================================================
  {
    type: 'theory',
    title: "1. Listes : Méthodes Essentielles",
    content: `
Une liste en Python n'est pas juste un sac. C'est un outil dynamique.
En ML, on passe notre temps à nettoyer des listes.

**Les 3 Rois :**
1.  **.append()** : Ajouter à la fin (Construction de dataset).
2.  **.pop()** : Retirer le dernier (ou un index précis).
3.  **.sort()** : Organiser (Attention: ça modifie la liste originale !).
    `
  },
  {
    type: 'interactive-code',
    title: "Manipulation de Liste (CRUD)",
    code: `todo = ["Data", "Model", "Train"]

# 1. AJOUTER
todo.append("Deploy")      # À la fin
todo.insert(0, "Setup")    # Au début (Index 0)

# 2. RETIRER
last = todo.pop()          # Retire "Deploy" et le stocke
todo.remove("Data")        # Cherche "Data" et le supprime

# 3. CHERCHER
if "Model" in todo:
    pos = todo.index("Model") # Renvoie la position (1)

print(todo)`,
    explanations: [
      { line: 5, text: ".insert(0, ...) est coûteux en performance car il décale tout le reste." },
      { line: 8, text: ".pop() est très utilisé pour les algorithmes de 'Stack' (Pile)." },
      { line: 12, text: "Toujours vérifier avec 'if in' avant de demander .index() pour éviter un crash." }
    ]
  },

  // ============================================================
  // SECTION 2: SLICING (DÉCOUPAGE CHIRURGICAL)
  // ============================================================
  {
    type: 'theory',
    title: "2. Slicing : La Chirurgie des Données",
    content: `
Le Slicing \`[start : stop : step]\` est la compétence #1 pour manipuler les matrices (NumPy) plus tard.

**Règle d'Or :** La borne de fin est **EXCLUE**.
\`[0:3]\` prend les index 0, 1, 2. (Pas le 3).
    `
  },
  {
    type: 'interactive-code',
    title: "Slicing Avancé (Train/Test Split)",
    code: `dataset = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

# Scénario ML : Séparer Train (80%) et Test (20%)
limit = 8

# Du début jusqu'à l'index 8 (exclu)
train_set = dataset[:limit] 

# De l'index 8 jusqu'à la fin
test_set = dataset[limit:]

# Inverser la liste (Step négatif)
reverse = dataset[::-1] 

print(f"Train: {train_set}")
print(f"Test: {test_set}")`,
    explanations: [
      { line: 7, text: "[:8] est un raccourci pour [0:8]. Prend les 8 premiers éléments." },
      { line: 10, text: "[8:] prend tout ce qui reste. C'est parfait pour diviser un dataset." },
      { line: 13, text: "[::-1] est l'idiome Pythonique pour inverser une séquence instantanément." }
    ]
  },

  // ============================================================
  // SECTION 3: DICTIONNAIRES (LA STRUCTURE JSON)
  // ============================================================
  {
    type: 'theory',
    title: "3. Dictionnaires : Clé & Valeur",
    content: `
Le Dictionnaire est la structure la plus rapide pour **chercher** une info.
C'est exactement comme un objet JSON.

**Pourquoi c'est vital ?**
Les configurations de modèles ML (Hyperparamètres) sont toujours stockées dans des dicts.
    `
  },
  {
    type: 'interactive-code',
    title: "Dictionnaires & Méthode .get()",
    code: `config = {
    "learning_rate": 0.01,
    "epochs": 100,
    "model": "LinearRegression"
}

# Lire une valeur (DANGEREUX)
# lr = config["optimizer"] -> CRASH si la clé n'existe pas !

# Lire une valeur (SÉCURISÉ)
opt = config.get("optimizer", "adam") 

# Mettre à jour plusieurs valeurs
config.update({
    "epochs": 200,
    "batch_size": 32
})

# Nettoyer
old_model = config.pop("model")`,
    explanations: [
      { line: 10, text: ".get('clé', 'défaut') est OBLIGATOIRE en production. Si la clé manque, il utilise la valeur par défaut." },
      { line: 13, text: ".update() est puissant : il modifie l'existant (epochs) ET ajoute le nouveau (batch_size)." },
      { line: 18, text: ".pop() supprime la clé et renvoie sa valeur. Utile pour extraire des labels." }
    ]
  }
];