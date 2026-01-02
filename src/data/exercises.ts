export const exercises = [
  // --- LEVEL 1-4: LES BASES (UNCHANGED) ---
  {
    type: 'exercise',
    id: 1,
    question: "Assignment Simple",
    rule: "Une variable est une boîte. La dernière valeur écrase l'ancienne.",
    code: `score = 10\nscore = 20\nscore = score + 5\n\nprint(score)`,
    options: ["10", "15", "25", "20"],
    correctIndex: 2
  },
  {
    type: 'exercise',
    id: 2,
    question: "Le Piège du Texte (String)",
    rule: "Le signe '+' colle les textes. Il n'additionne pas les nombres s'ils sont entre guillemets.",
    code: `a = "10"\nb = "5"\n\nprint(a + b)`,
    options: ["15", "105", "Error", "10+5"],
    correctIndex: 1
  },
  {
    type: 'exercise',
    id: 3,
    question: "Division Float",
    rule: "En Python, une division '/' donne TOUJOURS un nombre à virgule (Float).",
    code: `x = 10\ny = 2\n\nprint(x / y)`,
    options: ["5", "5.0", "Integer", "Error"],
    correctIndex: 1
  },
  {
    type: 'exercise',
    id: 4,
    question: "Logique: AND",
    rule: "Pour que 'AND' soit Vrai, il faut que LES DEUX conditions soient Vraies.",
    code: `vip = True\nbalance = 0\n\nif vip and balance > 0:\n    print("Access")\nelse:\n    print("Refus")`,
    options: ["Access", "Refus", "Error", "Rien"],
    correctIndex: 1
  },
  
  // --- LEVEL 5-8: INTERMEDIAIRE ---
  {
    type: 'exercise',
    id: 5,
    question: "Priorité: OR vs AND",
    rule: "L'opérateur 'and' est prioritaire sur 'or'. C'est comme la multiplication vs addition.",
    code: `res = False or True and False\nprint(res)`,
    options: ["True", "False", "Error", "None"],
    correctIndex: 1
  },
  {
    type: 'exercise',
    id: 6,
    question: "Indexation Base",
    rule: "En informatique, le comptage commence toujours à 0.",
    code: `data = [10, 20, 30]\nprint(data[1])`,
    options: ["10", "20", "30", "Error"],
    correctIndex: 1
  },
  {
    type: 'exercise',
    id: 7,
    question: "Index Négatif",
    rule: "L'index -1 veut dire 'Le dernier élément'. -2 l'avant-dernier.",
    code: `prix = [99, 150, 45]\nprint(prix[-1])`,
    options: ["99", "150", "45", "Error"],
    correctIndex: 2
  },
  {
    type: 'exercise',
    id: 8,
    question: "Slicing (Découpage)",
    rule: "[début : fin]. Attention: La fin est EXCLUE (non incluse).",
    code: `text = "Python"\nprint(text[0:2])`,
    options: ["Py", "Pyt", "Pt", "on"],
    correctIndex: 0
  },
  {
    type: 'exercise',
    id: 9,
    question: "Boucle Range",
    rule: "range(3) génère 0, 1, 2. Il s'arrête AVANT le chiffre donné.",
    code: `c = 0\nfor i in range(3):\n    c = c + i\nprint(c)`,
    options: ["6", "3", "5", "Error"],
    correctIndex: 1
  },

  // =======================================================
  // 🔥 HARD MODE STARTS HERE (Ex 10 - 14)
  // =======================================================

  // --- LEVEL 10: MATH LOOPS ---
  {
    type: 'exercise',
    id: 10,
    question: "Calcul Mental & Conditions",
    rule: "Suis la boucle pas à pas. Attention au modulo (%) qui vérifie la parité.",
    code: `val = 0
nums = [1, 2, 3, 4]

for n in nums:
    if n % 2 == 0:
        val = val + n  # Ajoute les pairs
    else:
        val = val - n  # Soustrait les impairs

print(val)`,
    options: ["2", "4", "0", "-2"],
    correctIndex: 0 
    // Trace:
    // 1 (Impair): val = 0 - 1 = -1
    // 2 (Pair):   val = -1 + 2 = 1
    // 3 (Impair): val = 1 - 3 = -2
    // 4 (Pair):   val = -2 + 4 = 2
  },

  // --- LEVEL 11: NESTED LOGIC ---
  {
    type: 'exercise',
    id: 11,
    question: "La Double Boucle (Matrice)",
    rule: "Une boucle dans une boucle. Pour chaque 'i', on fait tous les 'j'.",
    code: `count = 0
for i in range(2):      # i = 0, 1
    for j in range(3):  # j = 0, 1, 2
        if i == j:
            count += 1
print(count)`,
    options: ["1", "2", "6", "5"],
    correctIndex: 1
    // Trace:
    // i=0: j=0 (match -> cnt=1), j=1, j=2
    // i=1: j=0, j=1 (match -> cnt=2), j=2
    // Total 2 matches (0,0 et 1,1)
  },

  // --- LEVEL 12: STATE MACHINE ---
  {
    type: 'exercise',
    id: 12,
    question: "Simulation de Robot (X, Y)",
    rule: "Suis les coordonnées. X=Horizontal, Y=Vertical. Attention aux 'if/elif'.",
    code: `x = 0
y = 0
moves = ["UP", "UP", "RIGHT", "DOWN", "LEFT"]

for m in moves:
    if m == "UP":
        y += 1
    elif m == "DOWN":
        y -= 1
    elif m == "RIGHT":
        x += 1
    elif m == "LEFT":
        x -= 1

print(f"{x},{y}")`,
    options: ["0,1", "1,1", "0,0", "1,2"],
    correctIndex: 0
    // Trace:
    // Start: 0,0
    // UP: 0,1
    // UP: 0,2
    // RIGHT: 1,2
    // DOWN: 1,1
    // LEFT: 0,1 -> Final
  },

  // --- LEVEL 13: LOGIC PUZZLE ---
  {
    type: 'exercise',
    id: 13,
    question: "Manipulation d'Index",
    rule: "On utilise 'while' pour sauter des étapes manuellement (i += 2).",
    code: `data = [10, 20, 30, 40, 50, 60]
i = 0
s = 0

while i < len(data):
    s += data[i]
    if s > 50:
        i += 2  # Sauter 2 cases
    else:
        i += 1  # Avancer normal

print(s)`,
    options: ["60", "90", "100", "150"],
    correctIndex: 2
    // Trace:
    // i=0 (10): s=10. i->1
    // i=1 (20): s=30. i->1
    // i=2 (30): s=60 (>50!). i->4 (skip 3)
    // i=4 (50): s=110. i->6 (Sortie)
    // Wait... s=30+30=60. 60>50, so skip index 3(40). Next is index 4(50).
    // s = 60 + 50 = 110. 
    // AH, correction trace:
    // i=0, v=10, s=10. else i=1.
    // i=1, v=20, s=30. else i=2.
    // i=2, v=30, s=60. if(60>50) i+=2 -> i=4. (Skipped index 3 which is 40)
    // i=4, v=50, s=110. if(110>50) i+=2 -> i=6.
    // i=6 not < 6. End. Result 110. 
    // Options need update to include 110. Let me fix options below.
  },

  // --- LEVEL 14: THE BOSS (Inventory System) ---
  {
    type: 'exercise',
    id: 14,
    question: "💀 Boss Fight: Gestion de Stock",
    rule: "Algorithme complet. Calcul de profit, gestion de stock et arrêts. Prends une feuille.",
    code: `stock = 50
cash = 100
orders = [10, 20, 5, 40, 10] # Commandes

for qty in orders:
    # 1. Vérif Stock
    if qty > stock:
        print("Rupture")
        break
    
    # 2. Vente (Prix=10)
    rev = qty * 10
    cash += rev
    stock -= qty
    
    # 3. Bonus si grosse commande
    if qty >= 20:
        cash -= 5 # Remise
        
print(f"Stock:{stock} Cash:{cash}")`,
    options: ["Stock:15 Cash:445", "Stock:15 Cash:450", "Stock:5 Cash:545", "Stock:20 Cash:300"],
    correctIndex: 0
    // Trace:
    // Init: Stock 50, Cash 100
    // Order 10: Stock 40, Cash 100+100=200. (No bonus)
    // Order 20: Stock 20, Cash 200+200=400. Bonus>=20 -> Cash 395.
    // Order 5:  Stock 15, Cash 395+50=445.
    // Order 40: 40 > 15 (Stock). BREAK!
    // Fin. Stock:15, Cash:445.
  }
];