import java.util.Arrays;
public class sort {
    public static void main(String[] args) {
        int[] array = {5, 3, 8, 2, 1, 7, 6, 4};

        System.out.println("Original Array: " + Arrays.toString(array));

        //CALL METHOD
        //bubbleSort(array);
        //heapSort(array);
        //selectionSort(array);
        //insertionSort(array);
        //mergeSort(array);
        //quickSort(array, 0, array.length-1);
        

        System.out.println("Sorted Array: " + Arrays.toString(array));
    }
    //Algorithms
    
    public static void mergeSort(int[] array) {
        //if empty or sorted
        if (array == null || array.length <= 1) {
            return; 
        }
        int[] temp = new int[array.length];
        mergeSort(array, temp, 0, array.length - 1);
    }

    public static void mergeSort(int[] array, int[] temp, int low, int high) {
        if (low < high) {
            int mid = (low + high) / 2;
            //merge sort left and right halfs
            mergeSort(array, temp, low, mid);
            mergeSort(array, temp, mid + 1, high);
            
            //Put the two halfs together:
            
            //make a copy of the array
            for (int i = low; i <= high; i++) {
                temp[i] = array[i];
            }
            //store indices
            int left = low;
            int right = mid + 1;
            int current = low;
            //merge array and temp array
            while (left <= mid && right <= high) {
                if (temp[left] <= temp[right]) {
                    array[current] = temp[left];
                    left++;
                } else {
                    array[current] = temp[right];
                    right++;
                }
                current++;
            }
            //if any elements remain then put then into the final array
            while (left <= mid) {
                array[current] = temp[left];
                left++;
                current++;
            }
            }
    }
    
        
    
    

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
        //Partition
        //far right is pivot
        int pivot = arr[high];

        //lower element index
        int i = low - 1;

        //iterate through array
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                //Swap if element is less than equal to pivot
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        //Swap
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        int pivotIndex = i + 1;
    
        //Left and right subarrays
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
        }
    }
    
    
    

    public static void bubbleSort(int[] array){
        int i = 0;
        boolean swapped;
        //before second last element
        while(i < array.length-1){
            swapped = false;
            int j = 0;
            //find max, go until the length-1 - i(number of times we have put the value at the end)
            while(j < array.length-(i+1)){
                if(array[j] > array[j+1]){
                    //swap
                    int temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                    swapped = true;
                }
                j++;
            }
            //no elements were swapped
            if(swapped == false){
                return;
            }
            i++;
        }

    }


    public static void heapSort(int[] array){
        //first convert array into a heap data structure
        //we can do this by calling a heapify function starting from last non leaf node n/2-1
        for(int i = array.length/2 -1; i>=0; i--){
            heapify(array, array.length, i);
        }
        
        int i = array.length-1;
        while(i>0){
            //delete the root node and replace it with the last node in the heap
            //remove new last node, and heapify the elements again
            //continue process until sorted array, then reverse the order
            int temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            heapify(array, i, 0);
            i--;
        }


    }

    public static void heapify(int[] array, int length, int rootIndex){
        int left = 2*rootIndex + 1;
        int right = 2*rootIndex + 2;
        int root = rootIndex;
        //largest with left child, if child is bigger then assign value to largest
        if (left < length && array[left] > array[root]) {
            root = left;
        }
        //largest with right child
        if (right< length && array[right] > array[root]) {
            root = right;
        }
        // If the root is not the largest, swap and recursively heapify the affected subtree
        if (root != rootIndex) {
            int temp = array[rootIndex];
            array[rootIndex] = array[root];
            array[root] = temp;
            heapify(array, length, root);
        }
    }



    public static void selectionSort(int[] array){
        //int placeHolder;
        int minElement;
        int count = 0;

        while(count+1<array.length){
            minElement = array[count+1];
            //find min element
            int minElementIndex = count+1;
            for(int i = count+1; i<array.length; i++){
                if(array[i] < minElement){
                    minElement = array[i];
                    minElementIndex = i;
                }
            }
            //swap place holder and smallest element if it smallest element is smaller
            int placeHolder = array[count];
            if(placeHolder > minElement){
                array[count] = minElement;
                array[minElementIndex] = placeHolder;
            }
            
            count++;
        }
    }


    public static void insertionSort(int[] array){
        //compare first two elements, swap if out of order, new first element is now in a sorted sub-array

        //compare second and third elements, swap if out of order, new second element is now in sorted sub array with first element
        //      only if second is bigger than first

        //compare third and fourth elements, swap if out of order, then if swap compare new third with second (and first if necessary)
        int firstIndex;
        int secondIndex = 1;
        int tempValue;
        //move through array until the end of the array
        while(secondIndex < array.length){
            tempValue = array[secondIndex];
            firstIndex = secondIndex -1;

            //only the firstIndex is being updated so dont use secondIndex for any
            //keep swapping back until in order by moving the previous one ahead
            while(firstIndex >= 0 && tempValue < array[firstIndex]){
                array[firstIndex+1] = array[firstIndex];
                firstIndex--;
            }
            //since we kept the original second index now we can update it to the correct place
            array[firstIndex+1] = tempValue;
            secondIndex++;
        }
        
    
    }
    
}
