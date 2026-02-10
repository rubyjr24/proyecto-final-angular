export enum DishType {
    Entree = 'ENTREE',
    MainCourse = 'MAIN_COURSE',
    Dessert = 'DESSERT',
    Beverage = 'BEVERAGE',
    SideDish = 'SIDE_DISH',
    Appetizer = 'APPETIZER'
}

// variable para la traducción a español
export const DishTypeLabel: Record<DishType, string> = {
    [DishType.Entree]: 'Entrante',
    [DishType.MainCourse]: 'Plato Principal',
    [DishType.Dessert]: 'Postre',
    [DishType.Beverage]: 'Bebida',
    [DishType.SideDish]: 'Guarnición',
    [DishType.Appetizer]: 'Aperitivo'
};