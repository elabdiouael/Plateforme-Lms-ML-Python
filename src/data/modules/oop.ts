// src/data/modules/oop.ts

export const oop = [
  // ============================================================
  // SECTION 1: LE CONCEPT (BLUEPRINT)
  // ============================================================
  {
    type: 'theory',
    title: "1. OOP : Le Moule et le Gâteau",
    content: `
L'Orienté Objet (OOP) fait peur, mais c'est simple.

- **Class (Le Plan)** : La définition technique (ex: "Plan d'un Robot").
- **Object (L'Instance)** : Le robot réel construit à partir du plan.
- **Attributes** : Les variables du robot (Batterie, Nom).
- **Methods** : Les fonctions du robot (Avancer, Calculer).

En ML, \`model = LinearRegression()\` crée un objet à partir de la classe LinearRegression.
    `
  },
  {
    type: 'interactive-code',
    title: "Classe ML (Simulation)",
    code: `class MLModel:
    # Le Constructeur (Initialisation)
    def __init__(self, name: str, learning_rate: float):
        self.name = name          # Attribut public
        self.lr = learning_rate   # Attribut public
        self.is_trained = False   # État initial

    # Une Méthode (Action)
    def train(self, data: list):
        print(f"Entraînement de {self.name}...")
        # Simulation de logique...
        self.is_trained = True

# Création de l'Objet (Instance)
model_v1 = MLModel("GPT-Mini", 0.01)

# Utilisation
model_v1.train([1, 2, 3])
print(f"Modèle entraîné ? {model_v1.is_trained}")`,
    explanations: [
      { line: 3, text: "__init__ est exécuté automatiquement à la création. 'self' représente l'objet lui-même." },
      { line: 4, text: "self.name = name : On stocke l'argument dans la mémoire de l'objet." },
      { line: 9, text: "Les méthodes ont toujours 'self' en premier paramètre pour accéder aux attributs." }
    ]
  },

  // ============================================================
  // SECTION 2: ENCAPSULATION (GETTER / SETTER)
  // ============================================================
  {
    type: 'theory',
    title: "2. Getters & Setters : La Sécurité",
    content: `
Pourquoi ne pas modifier \`model.lr = -100\` directement ?
Parce qu'on risque de casser la logique (un learning rate négatif est impossible).

**L'Encapsulation** consiste à protéger les données. On passe par des "Gardiens" (Méthodes) pour lire ou modifier.
    `
  },
  {
    type: 'interactive-code',
    title: "Protection des Données",
    code: `class SecureModel:
    def __init__(self):
        self._accuracy = 0.0 # _ (underscore) veut dire "Usage Interne"

    # GETTER (Lecture seule)
    @property
    def accuracy(self):
        return f"{self._accuracy * 100}%"

    # SETTER (Modification avec validation)
    @accuracy.setter
    def accuracy(self, value):
        if value < 0 or value > 1:
            print("Erreur: L'accuracy doit être entre 0 et 1")
        else:
            self._accuracy = value

model = SecureModel()
model.accuracy = 1.5  # Déclenche l'erreur !
model.accuracy = 0.95 # Valide`,
    explanations: [
      { line: 3, text: "Convention : Une variable commençant par '_' ne doit pas être touchée directement." },
      { line: 6, text: "@property transforme la méthode en attribut. On l'appelle sans parenthèses." },
      { line: 11, text: "@xxx.setter permet de définir une logique de validation avant d'accepter une valeur." }
    ]
  }
];