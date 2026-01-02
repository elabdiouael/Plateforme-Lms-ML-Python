export const algorithms = [
  // ============================================================
  // SECTION 1: MÉMOIRE & POINTEURS
  // ============================================================
  {
    type: 'theory',
    title: "1. La Mémoire : Étiquettes vs Boîtes",
    content: `
**Le Mythe :** Beaucoup pensent qu'une variable \`a = 10\` est une "boîte" qui contient le chiffre 10.
**La Réalité :** Python ne stocke jamais les valeurs DANS les variables.

1. Python crée l'objet \`10\` quelque part dans la mémoire (RAM).
2. La variable \`a\` est une **Étiquette (Pointeur)** qui contient l'adresse de cet objet.

**Le Danger (Aliasing) :**
Si tu écris \`b = a\`, tu ne copies pas l'objet. Tu colles juste une deuxième étiquette sur le MÊME objet. Si tu modifies l'un, l'autre change aussi.
    `
  },
  {
    type: 'interactive-code',
    title: "Preuve par l'Identité (id)",
    code: `original = [10, 20, 30]

# 1. Le Piège : Copie par Référence (Aliasing)
ref = original

# 2. La Solution : Vraie Copie (Clonage)
clone = original.copy()

# Modification sur 'ref'
ref[0] = 999 

# Vérification via l'Adresse Mémoire (ID)
print(f"ID Original : {id(original)}") 
# -> Affiche : 14023... (Adresse Mémoire)

print(f"ID Ref      : {id(ref)}")      
# -> Affiche : 14023... (Même ID = Même Objet)

print(f"ID Clone    : {id(clone)}")    
# -> Affiche : 55891... (ID Différent = Indépendant)

print(f"Original impacté ? {original[0]}") 
# -> Affiche : Original impacté ? 999`,
    explanations: [
      { line: 4, text: "DANGER : 'ref' n'est pas une nouvelle liste. C'est juste un post-it collé sur la liste 'original'." },
      { line: 7, text: "SOLUTION : .copy() oblige Python à construire une nouvelle liste physiquement séparée en mémoire." },
      { line: 10, text: "Regarde bien : Modifier 'ref' corrompt 'original' car ils partagent la même adresse." },
      { line: 13, text: "id() est le détecteur de mensonges. Si les IDs sont identiques, c'est le même objet." }
    ]
  },

  // ============================================================
  // SECTION 2: LIST COMPREHENSION
  // ============================================================
  {
    type: 'theory',
    title: "2. List Comprehension : L'Usine",
    content: `
La "List Comprehension" n'est pas juste du style. C'est une méthode optimisée pour traiter des données rapidement.
Imagine-la comme une chaîne de montage industrielle.

**La Formule Ingénieur :**
\`[ TRANSFORMATION for ELEMENT in LISTE if FILTRE ]\`

**Lecture de droite à gauche :**
"Parcours la liste, garde l'élément si le **Filtre** est bon, puis applique la **Transformation**."
    `
  },
  {
    type: 'interactive-code',
    title: "Nettoyage de Données (Filtering)",
    code: `raw_data = [100, -20, 0, 50, -5]

# SCÉNARIO : Garder les positifs et appliquer une TVA (20%)

# Méthode Classique (Lente & Verbeuse)
clean_v1 = []
for x in raw_data:
    if x > 0:            
        ttc = x * 1.2    
        clean_v1.append(ttc)

# Méthode Pro (List Comprehension)
clean_v2 = [x * 1.2 for x in raw_data if x > 0]

print(f"Résultat : {clean_v2}")
# -> Affiche : Résultat : [120.0, 60.0]`,
    explanations: [
      { line: 6, text: "clean_v1 = [] : On doit d'abord créer une liste vide manuellement. C'est lent." },
      { line: 7, text: "for x in raw_data : On lance la boucle classique." },
      { line: 13, text: "ANALYSE CRUCIALE : Tout se passe ici. '[...]' crée la liste. 'for' parcourt. 'if' filtre." },
      { line: 13, text: "if x > 0 : Le Filtre. Les négatifs sont ignorés." },
      { line: 13, text: "x * 1.2 : La Transformation. C'est ce qui sera stocké dans la nouvelle liste." }
    ]
  },

  // ============================================================
  // SECTION 3: FLOW CONTROL (MATCH CASE)
  // ============================================================
  {
    type: 'theory',
    title: "3. Flow Control : L'Évolution du If",
    content: `
Les chaînes de \`if / elif / else\` deviennent illisibles quand les conditions se multiplient.

**Match Case (Python 3.10+) :**
C'est le "Switch" moderne. Il est optimisé pour la **Catégorisation**.
En Data Science, on l'utilise pour trier des profils (Admin, User, Guest) ou gérer des codes d'erreur (404, 500, 200) proprement.
    `
  },
  {
    type: 'interactive-code',
    title: "Classification d'Utilisateurs",
    code: `user_role = "editor"

# Structure propre et extensible
match user_role:
    case "admin" | "owner":  # Pipe '|' signifie OU
        access = "Full Access"
        
    case "editor":
        access = "Edit Content"
        
    case "viewer":
        access = "Read Only"
        
    case _: # Wildcard (Sécurité)
        access = "No Access"
        print(f"Rôle inconnu : {user_role}")

print(f"Droits d'accès : {access}")
# -> Affiche : Droits d'accès : Edit Content`,
    explanations: [
      { line: 4, text: "match user_role : On observe la variable. C'est plus rapide qu'un 'if' classique." },
      { line: 5, text: "Le '|' (Pipe) est puissant : il groupe 'admin' OU 'owner' dans une seule logique." },
      { line: 14, text: "Le '_' (Tiret bas) est le filet de sécurité. Il capture tout ce qui n'a pas été prévu (comme un 'else')." }
    ]
  },

  // ============================================================
  // SECTION 4: FONCTIONS & SCOPE
  // ============================================================
  {
    type: 'theory',
    title: "4. Fonctions : Scope & Contrat",
    content: `
Une fonction est une boîte noire : Entrée (Args) -> Traitement -> Sortie (Return).

**Deux Règles d'Or :**
1. **Isolation (Scope) :** Ce qui se passe dans la fonction reste dans la fonction. Une variable locale meurt à la fin.
2. **Contrat (Type Hinting) :** On précise les types pour éviter les bugs.
    `
  },
  {
    type: 'interactive-code',
    title: "Scope & Type Hinting",
    code: `tva = 0.2 # Variable Globale (Accessible partout)

def calculer_prix(ht: float) -> float:
    # 'marge' est LOCALE. Elle n'existe qu'ici.
    marge = 5.0 
    
    # Lecture de la globale 'tva' autorisée
    total = ht * (1 + tva) + marge
    
    return total # La fonction s'arrête ici

p1 = calculer_prix(100.0)
print(f"Prix TTC : {p1}")
# -> Affiche : Prix TTC : 125.0

# print(marge) 
# -> ERREUR : NameError: name 'marge' is not defined`,
    explanations: [
      { line: 3, text: "ht: float -> C'est le CONTRAT. On exige un nombre décimal. Ça aide l'autocomplétion." },
      { line: 3, text: "-> float : On promet de renvoyer un nombre décimal." },
      { line: 5, text: "ISOLATION : 'marge' naît ici et meurt à la ligne 10. Impossible de la lire de l'extérieur." },
      { line: 10, text: "RETURN : C'est l'export. Sans ça, le résultat du calcul reste prisonnier de la fonction." }
    ]
  }
];